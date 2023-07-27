import './cars-manager.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';
import { CarInfo } from '../../car/car';

enum CarsManagerCss {
  CARS_MANAGER = 'cars-manager',
  CAR_NAME = 'car-name',
  BUTTON_DISABLED = 'button_disabled',
}

enum ButtonTitle {
  SELECT = 'SELECT',
  REMOVE = 'REMOVE',
}

export default class CarsManager extends DefaultView {
  private carInfo: CarInfo;

  private selectButton: HTMLElement;

  private removeButton: HTMLElement;

  private carNameElement: HTMLElement;

  constructor(carInfo: CarInfo, selectCallback: () => void, removeCallback: () => void) {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [CarsManagerCss.CARS_MANAGER],
      textContent: '',
    };
    super(params);

    this.carInfo = { ...carInfo };
    this.selectButton = this.createSelectButton(ButtonTitle.SELECT, selectCallback);
    this.removeButton = this.createRemoveButton(ButtonTitle.REMOVE, removeCallback);
    this.carNameElement = this.createCarNameElement(this.carInfo.name);

    this.configView();
  }

  public disableButtons() {
    this.selectButton.classList.add(CarsManagerCss.BUTTON_DISABLED);
    this.removeButton.classList.add(CarsManagerCss.BUTTON_DISABLED);
  }

  public enableButtons() {
    this.selectButton.classList.remove(CarsManagerCss.BUTTON_DISABLED);
    this.removeButton.classList.remove(CarsManagerCss.BUTTON_DISABLED);
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
