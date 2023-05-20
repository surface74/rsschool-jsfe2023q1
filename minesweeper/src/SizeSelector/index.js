import './index.scss';
import SizeSelectorHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

export default class SizeSelector {
  constructor(size) {
    this.element = HtmlHelper.ElementFromHTML(SizeSelectorHtml);
    this.value = size;
    this.init();
  }

  init() {
    const radios = Array.from(this.element.querySelectorAll('.size-selector__input'));
    radios.forEach((radio) => {
      if (this.value === +radio.value) {
        radio.setAttribute('checked', '');
      }
      radio.addEventListener('change', this.onChange.bind(this));
    });
  }

  onChange(e) {
    this.value = +e.target.value;
  }

  getElement() {
    return this.element;
  }
}
