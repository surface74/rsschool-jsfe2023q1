import { CarInfo } from '../car/car';
import DbModel, { WinnersSortField, WinnersSortOrder, WinnerInfo } from '../db-model/db-model';
import Favicon from '../favicon/index';
import CarLane from '../view/car-lane/car-lane';
import ControlsView from '../view/controls-view/controls-view';
import CurrentPage from '../view/current-page/current-page';
import Header from '../view/header/header';
import PageTitle from '../view/page-title/page-title';
import Paginator from '../view/paginator/paginator';

export default class App {
  private favicon: Favicon;

  private database: DbModel;

  constructor() {
    this.favicon = new Favicon();
    this.database = DbModel.getInstance();
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

    const carInfo: CarInfo = {
      id: 0,
      name: 'Test car',
      color: 'yellow',
    };
    const carLane = new CarLane(
      carInfo,
      () => console.log('select car'),
      () => console.log('delete car'),
      () => console.log('start car'),
      () => console.log('return car')
    );
    document.body.append(carLane.getElement());

    const paginator = new Paginator(
      0,
      1,
      () => console.log('paginator-prev'),
      () => console.log('paginator-next')
    );
    document.body.append(paginator.getElement());
  }
}
