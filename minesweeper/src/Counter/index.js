import './index.scss';
import CounterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

export default class Counter {
  constructor({ title, className = null }) {
    this.title = title;
    this.className = className;
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(CounterHtml);

    this.element.querySelector('.counter__title').innerHTML = this.title;
    if (this.className) {
      this.className.split(' ').forEach((c) => this.element.classList.add(c));
    }
  }

  getElement() {
    return this.element;
  }

  get value() {
    return this.querySelector('.counter__value').textContent;
  }

  set value(value) {
    this.querySelector('.counter__value').textContent = value;
  }
}
