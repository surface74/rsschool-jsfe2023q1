import Favicon from '../favicon/index';
import ControlsView from '../view/controls-view/controls-view';
// import EditView from '../view/edit-view/edit-view';
import Header from '../view/header/header';
import Paginator from '../view/paginator/paginator';

export default class App {
  private favicon: Favicon;

  constructor() {
    this.favicon = new Favicon();
  }

  init() {
    document.head.append(this.favicon.getHtmlElement());

    const header = new Header();

    document.body.append(header.getElement());

    const controlView = new ControlsView([
      () => console.log('control-0'),
      () => console.log('control-1'),
      () => console.log('control-2'),
    ]);
    document.body.append(controlView.getElement());

    const paginator = new Paginator(
      0,
      1,
      () => console.log('paginator-prev'),
      () => console.log('paginator-next')
    );
    document.body.append(paginator.getElement());
  }
}
