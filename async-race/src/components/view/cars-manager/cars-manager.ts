import './cars-manager.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';

enum CarsManagerCss {
  CARS_MANAGER = 'cars-manager',
  CAR_NAME = 'car-name',
}

enum ButtonTitle {
  SELECT = 'SELECT',
  REMOVE = 'REMOVE',
}

export default class CarsManager extends DefaultView {
  private selectButton: HTMLElement;

  private removeButton: HTMLElement;

  private carNameElement: HTMLElement;

  constructor(carName: string, selectCallback: () => void, removeCallback: () => void) {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [CarsManagerCss.CARS_MANAGER],
      textContent: '',
    };
    super(params);

    this.selectButton = this.createSelectButton(ButtonTitle.SELECT, selectCallback);
    this.removeButton = this.createRemoveButton(ButtonTitle.REMOVE, removeCallback);
    this.carNameElement = this.createCarNameElement(carName);

    this.configView();
  }

  private configView() {
    this.getCreator().addInnerElement(this.selectButton);
    this.getCreator().addInnerElement(this.removeButton);
    this.getCreator().addInnerElement(this.carNameElement);
  }

  createCarNameElement(name: string): HTMLElement {
    this.carNameElement = document.createElement(TagName.SPAN);
    this.carNameElement.textContent = name;
    this.carNameElement.classList.add(CarsManagerCss.CAR_NAME);
    return this.carNameElement;
  }

  private createSelectButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: text,
      callback,
    };

    this.selectButton = new Button(params).getElement();
    return this.selectButton;
  }

  private createRemoveButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: text,
      callback,
    };

    this.removeButton = new Button(params).getElement();
    return this.removeButton;
  }
}
