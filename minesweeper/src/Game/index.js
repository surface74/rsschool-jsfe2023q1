import '../styles/base/_normalize.scss';
import '../styles/base/_common.scss';
import '../styles/layout/_wrapper.scss';
import STATE from '../Field/const-state.js';
import CONTENT from '../Field/const-content.js';
import Playground from '../Playground/playground.js';
// import PlaygroundElement from '../Playground/index.js';
import Field from '../Field/index.js';

export default class Game {
  constructor() {
    this.playground = new Playground();
    // this.playground.element = PlaygroundElement;
    this.field = new Field();
    this.winEvent = new Event('win', { bubbles: true });
    this.loseEvent = new Event('lose', { bubbles: true });
    this.pauseEvent = new Event('pause', { bubbles: true });
  }

  init(size, mines) {
    this.playground.init(size, mines);
    this.fillPlayground();

    document.body.append(this.playground.element);
    this.playground.element.addEventListener('click', this.onPlaygroundClick.bind(this));
    this.playground.element.addEventListener('contextmenu', this.onPlaygroundRightClick.bind(this));
    document.body.addEventListener('win', this.onWin.bind(this));
    document.body.addEventListener('lose', this.onLose.bind(this));
    document.body.addEventListener('pause', this.onPause.bind(this));
  }

  fillPlayground() {
    for (let i = 0; i < this.playground.size ** 2; i += 1) {
      this.playground.element.append(this.field.getField(STATE.Hidden, i));
    }
  }

  onPlaygroundRightClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains('field')) {
      return;
    }
    const field = e.target;
    const fieldId = +field.dataset.id;

    const { state, content } = this.playground.getFieldData(fieldId);
    if (state === STATE.Hidden) {
      this.changeFieldState(field, content, STATE.Marked);
      if (this.playground.isWinPosition()) {
        document.body.dispatchEvent(this.winEvent);
      }
    } else if (state === STATE.Marked) {
      this.changeFieldState(field, content, STATE.Hidden);
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
        document.body.dispatchEvent(this.loseEvent);
        return;
      }

      this.changeFieldState(field, content, STATE.Open);
      if (!content) {
        this.openHeighbors(field);
      }

      if (this.playground.isWinPosition()) {
        document.body.dispatchEvent(this.winEvent);
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
        this.changeFieldState(neighorsField, (content) || '', STATE.Open);
        if (!content) { // empty field
          this.openHeighbors(neighorsField);
        }
      }
    }
  }

  changeFieldState(field, content, state) {
    this.playground.setFieldState(+field.dataset.id, state);
    const newField = this.field.getField(state, +field.dataset.id);
    field.replaceWith(newField);
    if (content) {
      newField.textContent = content;
    }
  }

  openPlayground() {
    const fields = Array.from(this.playground.element.querySelectorAll('.field'));
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      const { state, content } = this.playground.getFieldData(+field.dataset.id);
      if (state === STATE.Hidden || state === STATE.Marked) {
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
