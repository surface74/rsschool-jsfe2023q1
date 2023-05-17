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
    if (!this.playground.mines.length) { // the first click - start game
      this.startRound(field.dataset.id);
    }
    this.checkClickResult(field.dataset.id);
  }

  startRound(fieldId) {
    this.playground.initMines(fieldId);
    this.setFieldTitles();
    // TODO Start clock
  }

  setFieldTitles() {
    const fieldsData = Object.entries(document.querySelectorAll('.field'));
    for (let i = 0; i < fieldsData.length; i += 1) {
      const { row, column } = this.playground.getPosition(fieldsData[i][1].dataset.id);
      const { content } = this.playground.fields[row][column];
      if (content < CONST.Content.Mine) {
        fieldsData[i][1].textContent = content;
      }
    }
  }

  checkClickResult(fieldId) {
    const { state, content } = this.playground.getFieldData(fieldId);
    console.log('state, content: ', state, content);
    // switch (state) {
    //   case CONST.State.:

    //     break;

    //   default:
    //     break;
    // }

  }
}
