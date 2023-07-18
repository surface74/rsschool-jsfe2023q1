import html from './index.html';
import HtmlCreator from '../../utils/html-creator';

export default class Favicon {
  private element: DocumentFragment;

  private readonly template: string;

  constructor() {
    this.template = html;
    this.element = this.createElement();
  }

  getHtmlElement(): DocumentFragment {
    return this.element;
  }

  private createElement(): DocumentFragment {
    return HtmlCreator.ElementFromHTML(this.template);
  }
}
