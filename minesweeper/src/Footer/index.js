import './index.scss';
import FooterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Sound from '../Sound/index.js';

export default class Footer {
  constructor() {
    this.sound = new Sound();
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(FooterHtml);
    this.element.append(this.sound.getElement());
  }

  getElement() {
    return this.element;
  }
}
