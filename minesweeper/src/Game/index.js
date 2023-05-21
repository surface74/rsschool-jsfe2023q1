import '../styles/base/_normalize.scss';
import '../styles/base/_common.scss';
import '../styles/layout/_wrapper.scss';
import STATE from '../Field/const-state.js';
import CONTENT from '../Field/const-content.js';
import Header from '../Header/index.js';
import Playground from '../Playground/playground.js';
import Field from '../Field/index.js';
import Statistics from '../Statistics/index.js';
import Footer from '../Footer/index.js';
import Events from '../utils/events.js';

export default class Game {
  constructor() {
    this.playground = new Playground();
    this.field = new Field();
    this.events = new Events();
    this.statistics = new Statistics();
    this.footer = new Footer();
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
    document.body.addEventListener(this.events.ID.PAUSE, this.onPause.bind(this));
    document.body.addEventListener(this.events.ID.NEWGAME, this.onNewGame.bind(this));
  }

  static clearBody() {
    document.body.replaceWith(document.createElement('body'));
  }

  onNewGame(e) {
    const { mines, size } = e.detail;
    this.init(size, mines);
  }

  onPlaygroundRightClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('field')) {
      return;
    }
    const field = e.target;
    const fieldId = +field.dataset.id;

    const { state, content } = this.playground.getFieldData(fieldId);
    switch (state) {
      case STATE.Hidden:
        this.changeFieldState(field, content, STATE.Marked);
        if (this.playground.isWinPosition()) {
          document.body.dispatchEvent(this.events.getEvent(this.events.ID.WIN));
        }
        break;
      case STATE.Marked:
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

    const field = e.target;
    const fieldId = +field.dataset.id;

    if (!this.playground.mines.length) { // the first click - start game
      this.startRound(fieldId);
    }

    const { state, content } = this.playground.getFieldData(fieldId);
    if (state === STATE.Hidden) {
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

  startRound(fieldId) {
    this.playground.initMines(+fieldId);
    // TODO Reset && Start clock
    // TODO Reset StepCounter
    // Enable button Pause & Save
    // Disable button Restore
  }

  onWin() {
    console.log('winRound');
    this.openPlayground();
  }

  onLose() {
    console.log('loseRound');
    this.openPlayground();
  }

  onPause() {
    console.log('pauseRound');
    // TODO: hide board
    // stop clock
  }
}
