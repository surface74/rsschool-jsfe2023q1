import './controls-view.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';

enum ControlsViewCss {
  CONTROLS_VIEW = 'controls-view',
  CONTROLS_VIEW_BUTTON = 'controls-view__button',
  CONTROLS_VIEW_BUTTON_DISABLED = 'controls-view__button_disabled',
}

enum ButtonTitle {
  RACE = 'RACE',
  RESET = 'RESET',
  CREATE_CARS = 'CREATE CARS',
}

export default class ControlsView extends DefaultView {
  private raceButton: HTMLElement;

  private resetButton: HTMLElement;

  private createCarsButton: HTMLElement;

  constructor(raceCallback: () => void, resetCallback: () => void, createCarsCallback: () => void) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [ControlsViewCss.CONTROLS_VIEW],
      textContent: '',
    };
    super(params);

    this.raceButton = this.createRaceButton(ButtonTitle.RACE, raceCallback);
    this.resetButton = this.createResetButton(ButtonTitle.RESET, resetCallback);
    this.createCarsButton = this.createCreateCarsButton(ButtonTitle.CREATE_CARS, createCarsCallback);

    this.configView();
  }

  private createRaceButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON, ControlsViewCss.CONTROLS_VIEW_BUTTON],
      textContent: text,
      callback,
    };

    this.raceButton = new Button(params).getElement();
    return this.raceButton;
  }

  private createResetButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [
        ButtonCss.BUTTON,
        ControlsViewCss.CONTROLS_VIEW_BUTTON,
        ControlsViewCss.CONTROLS_VIEW_BUTTON_DISABLED,
      ],
      textContent: text,
      callback,
    };

    this.resetButton = new Button(params).getElement();
    return this.resetButton;
  }

  private createCreateCarsButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON, ControlsViewCss.CONTROLS_VIEW_BUTTON],
      textContent: text,
      callback,
    };

    this.createCarsButton = new Button(params).getElement();
    return this.createCarsButton;
  }

  public disableRaceButton() {
    this.raceButton.classList.add(ControlsViewCss.CONTROLS_VIEW_BUTTON_DISABLED);
  }

  public enableRaceButton() {
    this.raceButton.classList.remove(ControlsViewCss.CONTROLS_VIEW_BUTTON_DISABLED);
  }

  public disableResetButton() {
    this.resetButton.classList.add(ControlsViewCss.CONTROLS_VIEW_BUTTON_DISABLED);
  }

  public enableResetButton() {
    this.resetButton.classList.remove(ControlsViewCss.CONTROLS_VIEW_BUTTON_DISABLED);
  }

  private configView() {
    console.log('this.raceButton: ', this.raceButton);
    this.getElement().append(this.raceButton, this.resetButton, this.createCarsButton);
  }
}
