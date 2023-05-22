import './index.scss';
import FooterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Sound from '../Sound/index.js';
import Button from '../Button/index.js';

export default class Footer {
  constructor() {
    this.sound = new Sound();
    this.buttonTheme = Button({ className: 'button_theme' });
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(FooterHtml);
    this.element.append(this.sound.getElement());
    this.element.append(this.buttonTheme);
  }

  getElement() {
    return this.element;
  }
}
