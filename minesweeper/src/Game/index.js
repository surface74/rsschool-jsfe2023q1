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
        this.clearHeighbors();
      }
      this.checkWin();
    }
  }

  checkWin() {
    const opendFieldsCount = this.playground.fields.reduce((acc, { state }) => acc + +(state === CONST.State.Open), 0);
    console.log('opendFieldsCount: ', opendFieldsCount);
  }

  clearHeighbors() {
    console.log('clearHeighbors');
  }

  changeFieldState(field, content, state) {
    this.playground.setFieldState(field.dataset.id, state);
    const newField = this.field.getField(state, field.dataset.id);
    field.replaceWith(newField);
    if (content) {
      newField.textContent = content;
    }
  }

  loseRound() {
    console.log('loseRound');
    // TODO Open playground
    // TODO Stop clock
  }

  startRound(fieldId) {
    this.playground.initMines(fieldId);
    // TODO Reset && Start clock
    // TODO Reset StepCounter
    // Enable button Pause & Save
    // Disable button Restore
  }
}
