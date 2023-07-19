import './header.scss';
import TagName from '../../../enums/tag-name';
import HtmlCreator, { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';
import Button, { ButtonParams, ButtonCss } from '../../button/button';

enum HeaderCss {
  HEADER = 'header',
  NAV = 'nav',
}

type ButtonConfig = { text: string; callback: () => void };

enum ButtonTitle {
  TO_GARAGE = 'TO GARAGE',
  TO_WINNERS = 'TO WINNERS',
}

export default class Header extends DefaultView {
  private buttons: Array<ButtonConfig>;

  private navElement: HTMLElement;

  constructor() {
    const params: ElementParams = {
      tag: TagName.HEADER,
      classNames: [HeaderCss.HEADER],
      textContent: '',
    };
    super(params);

    this.buttons = [
      {
        text: ButtonTitle.TO_GARAGE,
        callback: () => {
          console.log('garage');
        },
      },
      {
        text: ButtonTitle.TO_WINNERS,
        callback: () => {
          console.log('winners');
        },
      },
    ];

    this.navElement = this.addNavElement();

    this.configView();
  }

  private configView() {
    this.addButtons();
  }

  private addNavElement(): HTMLElement {
    const params: ElementParams = {
      tag: TagName.NAV,
      classNames: [HeaderCss.NAV],
      textContent: '',
    };

    this.navElement = new HtmlCreator(params).getElement();
    this.getCreator().addInnerElement(this.navElement);

    return this.navElement;
  }

  private addButtons() {
    this.buttons.forEach(({ text, callback }) => {
      const params: ButtonParams = {
        classNames: [ButtonCss.BUTTON],
        textContent: text,
        callback,
      };

      const button = new Button(params).getElement();
      this.navElement.append(button);
    });
  }
}
