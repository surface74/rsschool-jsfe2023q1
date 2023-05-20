import './index.scss';
import Popup from '../Popup/index.js';
import NewGameHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';
import MineSelector from '../MineSelector/index.js';
import SizeSelector from '../SizeSelector/index.js';

export default class NewGame {
  constructor(currentConfig) {
    this.config = currentConfig;
    this.sizeSelector = new SizeSelector(this.config.size);
    this.mineSelector = new MineSelector(this.config.mines);
    this.buttonOK = Button({
      onClick: this.onClickOk.bind(this),
      title: 'OK',
      className: 'button-OK',
    });
    this.init();
  }

  init() {
    const content = HtmlHelper.ElementFromHTML(NewGameHtml);
    content.append(this.sizeSelector.getElement());
    content.append(this.mineSelector.getElement());
    this.element = Popup({ htmlElement: content, className: 'popup_hidden' });
    content.append(this.buttonOK);
  }

  getElement() {
    return this.element;
  }

  setConfig() {
    this.parent.config = { mines: this.data.mines, size: this.data.size };
    this.parent.mineSelector.value = this.data.mines;
  }

  getConfig() {
    return this.config;
  }

  onClickOk() {
    this.element.classList.add('popup_hidden');
    document.body.dispatchEvent(this.config.onOkEvent);
  }
}
