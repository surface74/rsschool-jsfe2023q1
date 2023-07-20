import './paginator.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';

enum PaginatorCss {
  PAGINATOR = 'paginator',
}

enum ButtonTitle {
  PREV = 'PREV',
  NEXT = 'NEXT',
}

export default class Paginator extends DefaultView {
  private prevButton: HTMLElement;

  private nextButton: HTMLElement;

  private currentPage: number;

  private totalPage: number;

  constructor(currentPage: number, totalPage: number, prevCallback: () => void, nextCallback: () => void) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PaginatorCss.PAGINATOR],
      textContent: '',
    };
    super(params);

    this.currentPage = currentPage;

    this.totalPage = totalPage;

    this.prevButton = this.createPrevButton(ButtonTitle.PREV, prevCallback);
    this.nextButton = this.createNextButton(ButtonTitle.NEXT, nextCallback);

    this.configView();
  }

  private configView() {
    this.getCreator().addInnerElement(this.prevButton);
    this.getCreator().addInnerElement(this.nextButton);
  }

  private createPrevButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: text,
      callback,
    };

    this.prevButton = new Button(params).getElement();
    return this.prevButton;
  }

  private createNextButton(text: string, callback: () => void): HTMLElement {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: text,
      callback,
    };

    this.nextButton = new Button(params).getElement();
    return this.nextButton;
  }
}
