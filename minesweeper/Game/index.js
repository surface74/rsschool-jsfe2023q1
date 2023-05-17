import '../src/styles/base/_normalize.scss';
import '../src/styles/base/_common.scss';
import '../src/styles/layout/_wrapper.scss';
import icons from '../src/Favicon/index.js';
import Playground from '../src/Playground/playground.js';
import playgroundElement from '../src/Playground/index.js';

export default class Game {
  constructor() {
    this.playground = new Playground();
  }

  init(size, mines) {
    icons.forEach((icon) => document.head.append(icon));

    document.body.append(playgroundElement);

    this.playground.init(size, mines);
  }
}
