import './index.scss';
import Playground from './index.html';
import HtmlHelper from '../utils/html-helper.js';

export default class PlaygroundElement {
  static getElement() {
    return HtmlHelper.ElementFromHTML(Playground);
  }
}
