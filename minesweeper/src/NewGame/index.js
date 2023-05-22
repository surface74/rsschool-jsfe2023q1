import './index.scss';
import Popup from '../Popup/index.js';
import NewGameHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';
import MineSelector from '../MineSelector/index.js';
import SizeSelector from '../SizeSelector/index.js';
import Events from '../utils/events.js';

export default class NewGame {
  constructor() {
    this.sizeSelector = new SizeSelector(10);
    this.mineSelector = new MineSelector(10);
    this.buttonOK = Button({
      onClick: this.onClickOk.bind(this),
      title: 'OK',
      className: 'button-OK',
    });
    this.events = new Events();
    this.init();
  }

  init() {
    const content = HtmlHelper.ElementFromHTML(NewGameHtml);
    content.append(this.sizeSelector.getElement());
    content.append(this.mineSelector.getElement());
    this.element = Popup({ htmlElement: content });
    content.append(this.buttonOK);
  }

  getElement() {
    return this.element;
  }

  onClickOk() {
    const mines = this.mineSelector.value;
    const size = this.sizeSelector.value;
    this.element.dispatchEvent(this.events.getEvent(this.events.ID.NEWGAME, { mines, size }));
    this.element.replaceWith('');
  }
}
