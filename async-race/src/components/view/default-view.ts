import HtmlCreator, { ElementParams } from '../../utils/html-creator';

export default class DefaultView {
  private element: HTMLElement;

  private htmlCreator: HtmlCreator;

  constructor(params: ElementParams) {
    this.htmlCreator = this.createView(params);
    this.element = this.htmlCreator.getElement();
  }

  public getElement() {
    return this.element;
  }

  public getCreator() {
    return this.htmlCreator;
  }

  createView(params: ElementParams): HtmlCreator {
    this.htmlCreator = new HtmlCreator(params);

    return this.htmlCreator;
  }
}
