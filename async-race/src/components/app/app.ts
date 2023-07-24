import { CurrentPageKey } from '../../enums/storage-key';
import DbModel from '../db-model/db-model';
import Favicon from '../favicon/index';
import PageGarrage from '../view/page-garage/page-garage';
import Header from '../view/header/header';
import PageHolder from '../view/page-holder/page-holder';
import Storage from '../storage/storage';
import PageWinners from '../view/page-winners/page-winners';

export default class App {
  private favicon: Favicon;

  private database: DbModel;

  private storage: Storage;

  private winnersPageNumber: number = 1;

  private garagePageNumber: number = 1;

  private currentPage: CurrentPageKey = CurrentPageKey.GARAGE;

  constructor() {
    this.favicon = new Favicon();
    this.database = DbModel.getInstance();
    this.storage = new Storage();
  }

  init() {
    this.restoreState();

    document.head.append(this.favicon.getHtmlElement());

    const header = new Header();
    document.body.append(header.getElement());

    const pageHolder = new PageHolder();
    document.body.append(pageHolder.getElement());

    const pageGarage = new PageGarrage(this.garagePageNumber);
    const pageWinners = new PageWinners(this.winnersPageNumber);

    if (this.currentPage === CurrentPageKey.GARAGE) {
      pageHolder.setContent(pageGarage.getElement());
    } else {
      pageHolder.setContent(pageWinners.getElement());
    }
  }

  restoreState() {
    this.garagePageNumber = Storage.GetGaragePage();
    this.winnersPageNumber = Storage.GetWinnersPage();
    this.currentPage = Storage.GetCurrentPage();
  }
}
