import '../styles/base/_normalize.scss';
import '../styles/base/_common.scss';
import '../styles/themes/_theme-dark.scss';
import '../styles/layout/_wrapper.scss';
import STATE from '../Field/const-state.js';
import CONTENT from '../Field/const-content.js';
import Popup from '../Popup/index.js';
import Header from '../Header/index.js';
import Playground from '../Playground/playground.js';
import Field from '../Field/index.js';
import Statistics from '../Statistics/index.js';
import Footer from '../Footer/index.js';
import Events from '../utils/events.js';
import messages from '../utils/messages.js';
import HtmlHelper from '../utils/html-helper.js';
import State from '../utils/state.js';

export default class Game {
  constructor() {
    this.field = new Field();
    this.events = new Events();
  }

  init(size, mines) {
    this.flagMode = false;
    this.soundOn = true;
    this.header = new Header();
    this.results = this.header.results;
    this.playground = new Playground();
    this.statistics = new Statistics();
    this.timer = this.statistics.counterTime;
    this.footer = new Footer();
    this.sound = this.footer.sound;
    this.playground.init(size, mines);

    Game.clearBody();
    document.body.append(this.header.getElement());
    document.body.append(this.statistics.getElement());
    document.body.append(this.playground.element);
    document.body.append(this.footer.getElement());

    this.playground.element.addEventListener('click', this.onPlaygroundClick.bind(this));
    this.playground.element.addEventListener('contextmenu', this.onPlaygroundRightClick.bind(this));
    document.body.addEventListener(this.events.ID.WIN, this.onWin.bind(this));
    document.body.addEventListener(this.events.ID.LOSE, this.onLose.bind(this));
    document.body.addEventListener(this.events.ID.NEWGAME, this.onNewGame.bind(this));
    this.header.buttonSave.addEventListener('click', this.onSaveState.bind(this));
    this.header.buttonRestore.addEventListener('click', this.onRestoreState.bind(this));
    this.footer.buttonTheme.addEventListener('click', this.onToggleTheme.bind(this));
    this.footer.buttonFlag.addEventListener('click', this.onToggleFlagMode.bind(this));
    this.sound.checkbox.addEventListener('change', this.onChangeSoundState.bind(this));

    this.checkStorage();
  }

  onChangeSoundState(e) {
    this.soundOn = e.target.checked;
    this.saveConfig();
  }

  onToggleFlagMode() {
    if (this.flagMode) {
      this.playground.element.classList.remove('playground_flag-mode');
      this.footer.buttonFlag.classList.remove('playground_flag-mode');
    } else {
      this.playground.element.classList.add('playground_flag-mode');
      this.footer.buttonFlag.classList.add('playground_flag-mode');
    }
    this.flagMode = !this.flagMode;

    this.saveConfig();
  }

  saveConfig() {
    const config = {
      soundOn: this.soundOn,
      themeDark: document.body.classList.contains('theme_dark'),
    };

    State.SaveState(State.STORAGE.Config, config);
  }

  onToggleTheme() {
    document.body.classList.toggle('theme_dark');
    this.saveConfig();
  }

  getScore() {
    const mines = this.playground.mines.length;
    const fields = this.playground.size ** 2;
    const time = this.timer.value;

    return Math.trunc((1e8 * mines ** 2) / (fields * time));
  }

  checkStorage() {
    const saving = State.RestoreState(State.STORAGE.Game);
    if (saving) {
      this.results.restoreState(saving.results);
      this.enableRestore();
    }
    const results = State.RestoreState(State.STORAGE.Results);
    if (results) {
      this.results.restoreState(results);
    }
    const config = State.RestoreState(State.STORAGE.Config);
    if (config) {
      this.restoreConfig(config);
    }
  }

  restoreConfig(config) {
    this.soundOn = config.soundOn;
    console.log('config.soundOn: ', config.soundOn);
    this.sound.checkbox.checked = config.soundOn;

    if (config.themeDark) {
      document.body.classList.add('theme_dark');
    } else {
      document.body.classList.remove('theme_dark');
    }
  }

  enableRestore() {
    this.header.buttonRestore.classList.remove('button_disabled');
  }

  enableSave() {
    this.header.buttonSave.classList.remove('button_disabled');
  }

  disableSave() {
    this.header.buttonSave.classList.add('button_disabled');
  }

  onRestoreState() {
    const {
      fields, steps, time, sound, darkTheme,
    } = State.RestoreState(State.STORAGE.Game);

    if (darkTheme) {
      document.body.classList.add('theme_dark');
    } else {
      document.body.classList.remove('theme_dark');
    }
    this.timer.stop();
    this.statistics.counterSteps.value = steps;
    this.sound.restoreState(sound);
    this.playground.restoreState(fields);
    this.restorePlayground();
    this.timer.restoreState(time);
    this.timer.start();
  }

  restorePlayground() {
    const fields = Array.from(this.playground.element.querySelectorAll('.field'));

    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      const { state, content } = this.playground.getFieldData(+field.dataset.id);
      this.changeFieldState(field, content, state, true);
    }
    this.statistics.counterFlags.value = this.playground.markedField;
    this.statistics.counterMines.value = this.playground.mines.length - this.playground.markedField;
  }

  onSaveState() {
    const state = {
      fields: this.playground.fields,
      steps: this.statistics.counterSteps.value,
      time: this.timer.value,
      sound: this.sound.soundOn,
      darkTheme: document.body.classList.contains('theme_dark'),
    };

    State.SaveState(State.STORAGE.Game, state);
    this.enableRestore();
  }

  static clearBody() {
    document.body.replaceWith(document.createElement('body'));
  }

  onPlaygroundRightClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('field')) {
      return;
    }

    this.rightClickHandler(e.target);
  }

  clickHandler(field) {
    this.playSound(this.sound.audioStep);

    const fieldId = +field.dataset.id;

    if (!this.playground.mines.length) { // the first click - start game
      this.startRound(fieldId);
    }

    const { state, content } = this.playground.getFieldData(fieldId);
    if (state === STATE.Hidden) {
      this.incrementStep();
      if (content >= CONTENT.Mine) {
        this.changeFieldState(field, content, STATE.Explosion);
        document.body.dispatchEvent(this.events.getEvent(this.events.ID.LOSE));
        return;
      }

      this.changeFieldState(field, content, STATE.Open);
      if (!content) {
        this.openHeighbors(field);
      }

      if (this.playground.isWinPosition()) {
        document.body.dispatchEvent(this.events.getEvent(this.events.ID.WIN));
      }
    }
  }

  rightClickHandler(field) {
    if (!this.playground.mines.length) {
      return;
    }

    const fieldId = +field.dataset.id;

    const { state, content } = this.playground.getFieldData(fieldId);
    if (state !== STATE.Open) {
      this.playSound(this.sound.audioFlag);
    }
    switch (state) {
      case STATE.Hidden:
        this.incrementFlag();
        this.changeFieldState(field, content, STATE.Marked);
        if (this.playground.isWinPosition()) {
          document.body.dispatchEvent(this.events.getEvent(this.events.ID.WIN));
        }
        break;
      case STATE.Marked:
        this.decrementFlag();
        this.changeFieldState(field, content, STATE.Question);
        break;
      case STATE.Question:
        this.changeFieldState(field, content, STATE.Hidden);
        break;
      default:
        break;
    }
  }

  onPlaygroundClick(e) {
    if (!e.target.classList.contains('field')) {
      return;
    }
    if (this.flagMode) {
      this.rightClickHandler(e.target);
    } else {
      this.clickHandler(e.target);
    }
  }

  playSound(audio) {
    if (this.sound.soundOn) {
      audio.play();
    }
  }

  incrementStep() {
    this.statistics.counterSteps.value += 1;
  }

  incrementFlag() {
    this.statistics.counterFlags.value += 1;
    this.statistics.counterMines.value -= 1;
  }

  decrementFlag() {
    this.statistics.counterFlags.value -= 1;
    this.statistics.counterMines.value += 1;
  }

  openHeighbors(field) {
    const neighbors = this.playground.getFieldHeighbors(this.playground.getPosition(+field.dataset.id));

    for (let i = 0; i < neighbors.length; i += 1) {
      const { row, column } = neighbors[i];
      const { state, content } = this.playground.fields[row][column];
      const fieldId = this.playground.size * row + column;
      const neighorsField = this.playground.element.querySelector(`[data-id="${fieldId}"]`);

      if (state === STATE.Hidden) {
        this.changeFieldState(neighorsField, content || '', STATE.Open);
        if (!content) {
          this.openHeighbors(neighorsField);
        }
      }
    }
  }

  changeFieldState(field, content, state, restoreMode) {
    if (!restoreMode) {
      this.playground.setFieldState(+field.dataset.id, state);
    }
    const newField = this.field.getElement(state, +field.dataset.id);
    newField.textContent = content || '';

    if (content && state === STATE.Open) {
      Field.setColor(newField, content);
    }

    field.replaceWith(newField);
  }

  openPlayground() {
    const fields = Array.from(this.playground.element.querySelectorAll('.field'));
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      const { state, content } = this.playground.getFieldData(+field.dataset.id);
      if (state === STATE.Hidden || state === STATE.Marked || state === STATE.Question) {
        this.changeFieldState(
          field,
          content,
          (content < CONTENT.Mine) ? STATE.Open : STATE.Mine,
        );
      }
    }
  }

  onNewGame(e) {
    const { mines, size } = e.detail;
    this.init(size, mines);
    this.statistics.counterMines.value = 0;
    this.statistics.counterSteps.value = 0;
    this.statistics.counterFlags.value = 0;
    this.timer.reset();
  }

  startRound(fieldId) {
    this.playground.initMines(+fieldId);
    this.statistics.counterMines.value = this.playground.mines.length;
    this.statistics.counterSteps.value = 0;
    this.timer.reset();
    this.timer.start();
  }

  onWin() {
    this.timer.stop();
    this.playSound(this.sound.audioWin);
    this.openPlayground();
    const message = messages.winRound
      .replace('%1', Math.trunc(this.timer.value / 1000))
      .replace('%2', this.statistics.counterSteps.value);
    const messageElement = HtmlHelper.CreateElement({
      text: message,
      attr: { class: 'popup__title_win popup__title' },
    });
    const popup = Popup({ htmlElement: messageElement });
    document.body.append(popup);

    this.results.addResult(this.getScore());
    State.SaveState(State.STORAGE.Results, this.results.list);
  }

  onLose() {
    this.timer.stop();
    this.playSound(this.sound.audioLose);
    this.openPlayground();

    const message = HtmlHelper.CreateElement({
      text: messages.loseRound,
      attr: { class: 'popup__title_lose popup__title' },
    });
    const popup = Popup({ htmlElement: message });
    document.body.append(popup);
  }
}
