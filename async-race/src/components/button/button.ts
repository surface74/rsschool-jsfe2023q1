import './button.scss';
import EventName from '../../enums/event-name';
import TagName from '../../enums/tag-name';
import { ElementParams } from '../../utils/html-creator';
import DefaultView from '../view/default-view';

export enum ButtonCss {
  BUTTON = 'button',
  BUTTON_DISABLED = 'button_disabled',
}

export type ButtonParams = {
  classNames: Array<string>;
  textContent: string;
  callback: () => void;
};

export default class Button extends DefaultView {
  constructor(params: ButtonParams) {
    const elementParams: ElementParams = {
      tag: TagName.BUTTON,
      textContent: params.textContent,
      classNames: params.classNames,
    };

    super(elementParams);
    this.getElement().addEventListener(EventName.CLICK, params.callback);
  }
}
