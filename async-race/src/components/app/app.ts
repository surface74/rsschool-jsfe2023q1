import Favicon from '../favicon/index';
import CarControl from '../view/car-control/car-control';
import CarTrack from '../view/car-track/car-track';
import CarsManager from '../view/cars-manager/cars-manager';
import ControlsView from '../view/controls-view/controls-view';
import CurrentPage from '../view/current-page/current-page';
import Header from '../view/header/header';
import PageTitle from '../view/page-title/page-title';
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

    const pageTitle = new PageTitle('GARAGE', 2);
    document.body.append(pageTitle.getElement());
    pageTitle.setCarCount(111);

    const currentPage = new CurrentPage(0);
    document.body.append(currentPage.getElement());
    currentPage.setCurrentPage(222);

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

    const carTrack = new CarTrack({ id: 0, name: 'Lacia', color: '#550077' });
    document.body.append(carTrack.getElement());

    const carsManager = new CarsManager(
      'Tesla',
      () => console.log('carsManager - select car'),
      () => console.log('carsManager - remove car')
    );
    document.body.append(carsManager.getElement());

    const carControl = new CarControl(
      () => console.log('carControl - start'),
      () => console.log('carControl - return')
    );
    document.body.append(carControl.getElement());
  }
}
