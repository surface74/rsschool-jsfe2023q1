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
    const value = this.element.querySelector('.counter__value').textContent;
    return (Number.isFinite(+value)) ? +value : value;
  }

  set value(value) {
    this.element.querySelector('.counter__value').textContent = value;
  }
}
