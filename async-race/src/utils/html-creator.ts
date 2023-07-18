import TagName from '../enums/tag-name';

export type ElementParams = {
  tag: TagName;
  classNames: Array<string>;
  textContent: string;
};

export type InsertableElement = HTMLElement | DocumentFragment | HtmlCreator;

export default class HtmlCreator {
  private element: HTMLElement;

  constructor(params: ElementParams) {
    this.element = this.createElement(params);
  }

  static ElementFromHTML(htmlString: string): DocumentFragment {
    const template: HTMLTemplateElement = document.createElement('template');
    template.innerHTML = htmlString;
    const element: DocumentFragment = template.content;

    return element;
  }

  public getElement() {
    return this.element;
  }

  public addInnerElement(element: InsertableElement) {
    if (element instanceof HTMLElement || element instanceof DocumentFragment) {
      this.element.append();
    } else {
      this.element.append(element.getElement());
    }
  }

  private createElement(params: ElementParams): HTMLElement {
    this.element = document.createElement(params.tag);

    this.setCssClasses(params.classNames);

    this.setTextContent(params.textContent);

    return this.element;
  }

  private setCssClasses(cssClasses: Array<string>) {
    this.element.classList.add(...cssClasses);
  }

  private setTextContent(text: string) {
    if (text) {
      this.element.textContent = text;
    }
  }
}
