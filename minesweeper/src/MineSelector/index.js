import './index.scss';
import MineSelectorHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

export default class MineSelector {
  constructor() {
    this.element = HtmlHelper.ElementFromHTML(MineSelectorHtml);
    this.element.addEventListener('input', this.onInput.bind(this));
    this.inputElement = this.element.querySelector('.mine-selector__input');
    this.valueElement = this.element.querySelector('.mine-selector__value');
    this.value = this.inputElement.value;
  }

  getElement() {
    return this.element;
  }

  get value() {
    return +this.inputElement.value;
  }

  set value(value) {
    this.valueElement.textContent = value;
  }

  onInput(e) {
    this.valueElement.textContent = e.target.value;
  }
}
