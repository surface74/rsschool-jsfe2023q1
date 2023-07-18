import TagName from '../../enums/tag-name';
import HtmlCreator, { ElementParams } from '../../utils/html-creator';

type ViewParams = {
  tag: TagName;
  classNames: Array<string>;
};

export default class DefaultView {
  private element: HTMLElement;

  private htmlCreator: HtmlCreator;

  constructor(params: ViewParams) {
    this.htmlCreator = this.createView(params);
    this.element = this.htmlCreator.getElement();
  }

  public getElement() {
    return this.element;
  }

  public getCreator() {
    return this.htmlCreator;
  }

  createView(params: ViewParams): HtmlCreator {
    const elementParams: ElementParams = {
      tag: params.tag,
      classNames: params.classNames,
      textContent: '',
    };

    this.htmlCreator = new HtmlCreator(elementParams);

    return this.htmlCreator;
  }
}
