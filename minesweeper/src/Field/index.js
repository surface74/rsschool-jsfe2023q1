import CONST from '../Constants/index.js';
import './index.scss';
import FieldHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

export default class Field {
  constructor() {
    this.element = HtmlHelper.ElementFromHTML(FieldHtml);
  }

  getField(fieldState, id) {
    const field = this.element.cloneNode({ deep: true });
    field.dataset.id = id;
    switch (fieldState) {
      case CONST.State.Hidden:
        field.classList.add('field_hidden');
        break;
      case CONST.State.Open:
        field.classList.add('field_open');
        break;
      case CONST.State.Marked:
        field.classList.add('field_marked');
        break;
      case CONST.State.Mine:
        field.classList.add('field_mine');
        break;
      case CONST.State.Explosion:
        field.classList.add('field_explosion');
        break;
      default:
        break;
    }

    return field;
  }
}
