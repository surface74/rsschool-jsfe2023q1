import './index.scss';
import FieldHtml from './index.html';
import STATE from './const-state.js';
import HtmlHelper from '../utils/html-helper.js';

export default class Field {
  constructor() {
    this.element = HtmlHelper.ElementFromHTML(FieldHtml);
  }

  getElement(fieldState, id) {
    const field = this.element.cloneNode({ deep: true });
    field.dataset.id = id;
    switch (fieldState) {
      case STATE.Hidden:
        field.classList.add('field_hidden');
        break;
      case STATE.Open:
        field.classList.add('field_open');
        break;
      case STATE.Marked:
        field.classList.add('field_marked');
        break;
      case STATE.Mine:
        field.classList.add('field_mine');
        break;
      case STATE.Explosion:
        field.classList.add('field_explosion');
        break;
      default:
        break;
    }

    return field;
  }
}
