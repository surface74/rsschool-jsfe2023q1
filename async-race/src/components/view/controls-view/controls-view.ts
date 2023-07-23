import './controls-view.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';

enum ControlsViewCss {
  CONTROLS_VIEW = 'controls-view',
}

type ButtonConfig = { text: string; callback: () => void };

enum ButtonTitle {
  RACE = 'RACE',
  RESET = 'RESET',
  CREATE_CARS = 'CREATE CARS',
}

export default class ControlsView extends DefaultView {
  private buttons: Array<ButtonConfig>;

  constructor(raceCallback: () => void, resetCallback: () => void, createCarsCallback: () => void) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [ControlsViewCss.CONTROLS_VIEW],
      textContent: '',
    };
    super(params);
    this.buttons = [
      {
        text: ButtonTitle.RACE,
        callback: raceCallback,
      },
      {
        text: ButtonTitle.RESET,
        callback: resetCallback,
      },
      {
        text: ButtonTitle.CREATE_CARS,
        callback: createCarsCallback,
      },
    ];

    this.configView();
  }

  private configView() {
    this.addButtons();
  }

  private addButtons() {
    this.buttons.forEach(({ text, callback }) => {
      const params: ButtonParams = {
        classNames: [ButtonCss.BUTTON],
        textContent: text,
        callback,
      };

      const button = new Button(params).getElement();
      this.getElement().append(button);
    });
  }
}
