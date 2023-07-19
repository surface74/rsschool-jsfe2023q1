import Favicon from '../favicon/index';
import EditView from '../view/edit-view/edit-view';
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

    const editView = new EditView('Test', () => console.log('Test'));
    document.body.append(editView.getElement());
  }
}
