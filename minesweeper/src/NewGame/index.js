import './index.scss';
import Popup from '../Popup/index.js';
import NewGameHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';
import MineSelector from '../MineSelector/index.js';

export default class NewGame {
  constructor() {
    this.buttonEasy = Button({
      onClick: this.setMinesValue.bind({ parent: this, data: 10 }),
      title: 'Easy',
      className: 'button-difficulty-easy',
    });
    this.buttonMedium = Button({
      onClick: this.setMinesValue.bind({ parent: this, data: 25 }),
      title: 'Medium',
      className: 'button-difficulty-medium',
    });
    this.buttonHard = Button({
      onClick: this.setMinesValue.bind({ parent: this, data: 60 }),
      title: 'Hard',
      className: 'button-difficulty-hard',
    });
    this.mineSelector = new MineSelector();
    this.init();
  }

  init() {
    const content = HtmlHelper.ElementFromHTML(NewGameHtml);
    content.append(this.buttonEasy);
    content.append(this.buttonMedium);
    content.append(this.buttonHard);
    content.append(this.mineSelector.getElement());
    this.element = Popup({ htmlElement: content });
  }

  getElement() {
    return this.element;
  }

  setMinesValue() {
    this.parent.mineSelector.value = this.data;
  }
}
