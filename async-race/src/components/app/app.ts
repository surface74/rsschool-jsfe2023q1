import TagName from '../../enums/tag-name';
import HtmlCreator, { ElementParams } from '../../utils/html-creator';
import Favicon from '../favicon/index';

export default class App {
  private favicon: Favicon;

  constructor() {
    this.favicon = new Favicon();
  }

  init() {
    document.head.append(this.favicon.getHtmlElement());

    const param: ElementParams = {
      tag: TagName.DIV,
      classNames: ['red'],
      textContent: '',
    };

    const element = new HtmlCreator(param).getElement();
    document.body.append(element);
  }
}
