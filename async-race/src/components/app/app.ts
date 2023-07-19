import Favicon from '../favicon/index';
import Header from '../view/header/header';

export default class App {
  private favicon: Favicon;

  constructor() {
    this.favicon = new Favicon();
  }

  init() {
    document.head.append(this.favicon.getHtmlElement());

    const header = new Header();

    document.body.append(header.getElement());
  }
}
