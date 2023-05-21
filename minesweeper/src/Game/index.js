import '../styles/base/_normalize.scss';
import '../styles/base/_common.scss';
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

export default class Game {
  constructor() {
    this.playground = new Playground();
    this.field = new Field();
    this.events = new Events();
    this.statistics = new Statistics();
    this.footer = new Footer();
    this.sound = this.footer.sound;
    this.timer = this.statistics.counterTime;
  }

  init(size, mines) {
    this.playground.init(size, mines);

    this.header = new Header();

    Game.clearBody();
    document.body.append(this.header.getElement());
    document.body.append(this.statistics.getElement());
    document.body.append(this.playground.element);
    document.body.append(this.footer.getElement());

    this.playground.element.addEventListener('click', this.onPlaygroundClick.bind(this));
    this.playground.element.addEventListener('contextmenu', this.onPlaygroundRightClick.bind(this));
    document.body.addEventListener(this.events.ID.WIN, this.onWin.bind(this));
    document.body.addEventListener(this.events.ID.LOSE, this.onLose.bind(this));
    // document.body.addEventListener(this.events.ID.PAUSE, this.onPause.bind(this));
    document.body.addEventListener(this.events.ID.NEWGAME, this.onNewGame.bind(this));
  }

  static clearBody() {
    document.body.replaceWith(document.createElement('body'));
  }

  onPlaygroundRightClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('field')) {
      return;
    }

    const field = e.target;
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

    this.playSound(this.sound.audioStep);

    const field = e.target;
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
        if (!content) { // empty field
          this.openHeighbors(neighorsField);
        }
      }
    }
  }

  changeFieldState(field, content, state) {
    this.playground.setFieldState(+field.dataset.id, state);
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
    // Enable button Pause & Save
    // Disable button Restore
  }

  onWin() {
    this.timer.stop();
    this.playSound(this.sound.audioWin);
    this.openPlayground();
    const message = messages.winRound
      .replace('%1', this.statistics.counterTime.value)
      .replace('%2', this.statistics.counterSteps.value);
    const messageElement = HtmlHelper.CreateElement({
      text: message,
      attr: { class: 'popup__title_win popup__title' },
    });
    const popup = Popup({ htmlElement: messageElement });
    document.body.append(popup);

    // TODO: show result table
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

  // onPause() {
  //   console.log('pauseRound');
  //   this.timer.stop();
  //   // TODO: hide board
  //   // stop clock
  // }
}
