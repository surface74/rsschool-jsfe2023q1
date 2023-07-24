import './car-control.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';

enum CarControlCss {
  CAR_CONTROL = 'car-control',
  CAR_CONTROL_BUTTON_START = 'car-control__button_start',
  CAR_CONTROL_BUTTON_RETURN = 'car-control__button_return',
  CAR_CONTROL_BUTTON_DISABLED = 'car-control__button_disabled',
}

enum ButtonTitle {
  START = 'A',
  RETURN = 'B',
}

enum CarState {
  STOP,
  ENGINE_ON,
  RUN,
  BROKEN,
}

export default class CarControl extends DefaultView {
  private startButton: HTMLElement;

  private returnButton: HTMLElement;

  private currentState: CarState;

  constructor(startCallback: () => void, returnCallback: () => void) {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [CarControlCss.CAR_CONTROL],
      textContent: '',
    };
    super(params);

    this.currentState = CarState.STOP;

    this.startButton = this.createStartButton(ButtonTitle.START, startCallback);
    this.returnButton = this.createReturnButton(ButtonTitle.RETURN, returnCallback);

    this.configView();
  }

  private configView() {
    this.getCreator().addInnerElement(this.startButton);
    this.getCreator().addInnerElement(this.returnButton);
  }

  private createStartButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON, CarControlCss.CAR_CONTROL_BUTTON_START],
      textContent: text,
      callback,
    };

    this.startButton = new Button(params).getElement();
    return this.startButton;
  }

  private createReturnButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [
        ButtonCss.BUTTON,
        CarControlCss.CAR_CONTROL_BUTTON_RETURN,
        CarControlCss.CAR_CONTROL_BUTTON_DISABLED,
      ],
      textContent: text,
      callback,
    };

    this.returnButton = new Button(params).getElement();
    return this.returnButton;
  }

  public disableStartButton() {
    this.startButton.classList.add(CarControlCss.CAR_CONTROL_BUTTON_DISABLED);
  }

  public enableStartButton() {
    this.startButton.classList.remove(CarControlCss.CAR_CONTROL_BUTTON_DISABLED);
  }

  public disableReturnButton() {
    this.returnButton.classList.add(CarControlCss.CAR_CONTROL_BUTTON_DISABLED);
  }

  public enableReturnButton() {
    this.returnButton.classList.remove(CarControlCss.CAR_CONTROL_BUTTON_DISABLED);
  }
}
