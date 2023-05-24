import './index.scss';
import FooterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Sound from '../Sound/index.js';
import Button from '../Button/index.js';

export default class Footer {
  constructor() {
    this.sound = new Sound();
    this.buttonFlag = Button({ className: 'button_flag' });
    this.buttonTheme = Button({ className: 'button_theme' });
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(FooterHtml);
    this.element.append(this.sound.getElement());
    this.element.append(this.buttonFlag);
    this.element.append(this.buttonTheme);
  }

  getElement() {
    return this.element;
  }
}
