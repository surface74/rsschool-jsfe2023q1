import '../styles/base/_normalize.scss';
import '../styles/base/_common.scss';
import '../styles/layout/_wrapper.scss';
import CONST from '../Constants/index.js';
import Playground from '../Playground/playground.js';
import PlaygroundElement from '../Playground/index.js';
import Field from '../Field/index.js';

export default class Game {
  constructor() {
    this.playground = new Playground();
    this.playgroundElement = PlaygroundElement;
    this.field = new Field();
    this.winEvent = new Event('win', { bubbles: true });
    this.loseEvent = new Event('lose', { bubbles: true });
    this.pauseEvent = new Event('pause', { bubbles: true });
  }

  init(size, mines) {
    this.playground.init(size, mines);
    this.fillPlayground();

    document.body.append(PlaygroundElement);
    this.playgroundElement.addEventListener('click', this.onPlaygroundClick.bind(this));
    this.playgroundElement.addEventListener('contextmenu', this.onPlaygroundRightClick.bind(this));
    document.body.addEventListener('win', this.onWin);
    document.body.addEventListener('lose', this.onLose);
    document.body.addEventListener('pause', this.onPause);
  }

  fillPlayground() {
    for (let i = 0; i < this.playground.size ** 2; i += 1) {
      this.playgroundElement.append(this.field.getField(CONST.State.Hidden, i));
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
    if (state === CONST.State.Hidden) {
      this.changeFieldState(field, content, CONST.State.Marked);
      if (this.playground.isWinPosition()) {
        document.body.dispatchEvent(this.winEvent);
      }
    } else if (state === CONST.State.Marked) {
      this.changeFieldState(field, content, CONST.State.Hidden);
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
    if (state === CONST.State.Hidden) {
      if (content >= CONST.Content.Mine) {
        this.changeFieldState(field, content, CONST.State.Explosion);
        document.body.dispatchEvent(this.loseEvent);
        return;
      }

      this.changeFieldState(field, content, CONST.State.Open);
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
      const neighorsField = this.playgroundElement.querySelector(`[data-id="${fieldId}"]`);

      if (state === CONST.State.Hidden) {
        this.changeFieldState(neighorsField, (content) || '', CONST.State.Open);
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

  startRound(fieldId) {
    this.playground.initMines(+fieldId);

    // TODO Reset && Start clock
    // TODO Reset StepCounter
    // Enable button Pause & Save
    // Disable button Restore
  }

  onWin() {
    console.log('winRound');
  }

  onLose() {
    console.log('loseRound');
  }
}
