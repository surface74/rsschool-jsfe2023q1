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

  private pageGarage: PageGarrage;

  private pageWinners: PageWinners;

  private pageHolder: PageHolder;

  private currentPage: CurrentPageKey = CurrentPageKey.GARAGE;

  constructor() {
    this.favicon = new Favicon();
    this.database = DbModel.getInstance();
    this.storage = new Storage();

    this.restoreState();
    this.pageHolder = new PageHolder();
    this.pageGarage = new PageGarrage(this.garagePageNumber);
    this.pageWinners = new PageWinners(this.winnersPageNumber);
  }

  init() {
    document.head.append(this.favicon.getHtmlElement());

    const header = new Header(this.showGarage.bind(this), this.showWinners.bind(this));
    document.body.append(header.getElement());

    document.body.append(this.pageHolder.getElement());

    if (this.currentPage === CurrentPageKey.GARAGE) {
      this.pageHolder.setContent(this.pageGarage.getElement());
    } else {
      this.pageHolder.setContent(this.pageWinners.getElement());
    }
  }

  private showGarage() {
    this.pageHolder.setContent(this.pageGarage.getElement());
    Storage.SaveCurrentPage(CurrentPageKey.GARAGE);
  }

  private showWinners() {
    this.pageWinners.getWinnersFromDatabase();
    this.pageHolder.setContent(this.pageWinners.getElement());
    Storage.SaveCurrentPage(CurrentPageKey.WINNERS);
  }

  restoreState() {
    this.garagePageNumber = Storage.GetGaragePage();
    this.winnersPageNumber = Storage.GetWinnersPage();
    this.currentPage = Storage.GetCurrentPage();
  }
}
