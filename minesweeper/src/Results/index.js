import './index.scss';
import Popup from '../Popup/index.js';
import ResultsHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';
import Events from '../utils/events.js';

export default class Results {
  constructor() {
    this.MAX_LENGTH = 10;
    this.buttonOK = Button({
      onClick: this.onClickOk.bind(this),
      title: 'OK',
      className: 'button-OK',
    });
    this.events = new Events();
    this.list = [];
  }

  addResult(result) {
    this.list.unshift(result);
    this.list.length = this.MAX_LENGTH;
  }

  restoreState(results) {
    Object.assign(this.list, results);
    this.list.length = this.MAX_LENGTH;
  }

  getElement() {
    const content = HtmlHelper.ElementFromHTML(ResultsHtml);
    const listElement = content.querySelector('.results__table');
    listElement.replaceChildren();

    this.list.forEach((score) => {
      if (score) {
        const item = HtmlHelper.ElementFromHTML(`<li class='results__item'>${score}</>`);
        listElement.append(item);
      }
    });

    content.append(this.buttonOK);

    this.element = Popup({ htmlElement: content });

    return this.element;
  }

  onClickOk() {
    this.element.replaceWith('');
  }
}
