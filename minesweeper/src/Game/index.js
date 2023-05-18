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
  }

  init(size, mines) {
    this.playground.init(size, mines);
    this.fillPlayground();

    document.body.append(PlaygroundElement);
    this.playgroundElement.addEventListener('click', this.onPlaygroundClick.bind(this));
  }

  fillPlayground() {
    for (let i = 0; i < this.playground.size ** 2; i += 1) {
      this.playgroundElement.append(this.field.getField(CONST.State.Hidden, i));
    }
  }

  onPlaygroundClick(e) {
    if (!e.target.classList.contains('field')) {
      return;
    }
    const field = e.target;
    const fieldId = field.dataset.id;

    if (!this.playground.mines.length) { // the first click - start game
      this.startRound(fieldId);
    }

    const { state, content } = this.playground.getFieldData(fieldId);
    if (state === CONST.State.Hidden) {
      if (content >= CONST.Content.Mine) {
        this.changeFieldState(field, content, CONST.State.Explosion);
        this.loseRound();
        return;
      }

      this.changeFieldState(field, content, CONST.State.Open);
      if (!content) {
        this.openHeighbors(field);
      }

      if (this.playground.isWin()) {
        this.winRound();
      }
    }
  }

  openHeighbors(field) {
    console.log('clearHeighbors');
    const neighbors = this.playground.getFieldHeighbors(this.playground.getPosition(field.dataset.id));

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
    this.playground.setFieldState(field.dataset.id, state);
    const newField = this.field.getField(state, field.dataset.id);
    field.replaceWith(newField);
    if (content) {
      newField.textContent = content;
    }
  }

  startRound(fieldId) {
    this.playground.initMines(fieldId);
    // TODO Reset && Start clock
    // TODO Reset StepCounter
    // Enable button Pause & Save
    // Disable button Restore
  }

  winRound() {
    console.log('winRound');
    // TODO: stop clock
    // TODO: check & fill table of winners
  }

  loseRound() {
    console.log('loseRound');
    // TODO Open playground
    // TODO Stop clock
  }
}
