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
    this.playgroundElement.addEventListener('click', this.onPlaygroundClick);
  }

  fillPlayground() {
    for (let i = 0; i < this.playground.size ** 2; i += 1) {
      this.playgroundElement.append(this.field.getField(CONST.State.Hidden));
    }
  }

  onPlaygroundClick(e) {
    console.log(e.target);
  }
}
