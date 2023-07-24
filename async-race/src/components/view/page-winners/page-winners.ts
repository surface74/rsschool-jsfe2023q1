import './page-winners.scss';
import DefaultView from '../default-view';
import PageTitle from '../page-title/page-title';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';
import CurrentPage from '../current-page/current-page';
import Storage from '../../storage/storage';
import Paginator from '../paginator/paginator';
import DbModel, { WinnersSortField, WinnersSortOrder, WinnerInfo } from '../../db-model/db-model';

enum PageWinnersCss {
  PAGE_WINNERS = 'page-winners',
}

enum Titles {
  PAGE_TITLE = 'WINNERS',
}

export default class PageWinners extends DefaultView {
  private readonly ITEMS_PER_PAGE = 10;

  private pageNumber: number = 1;

  private totalCars: number = 0;

  private pageTitle: PageTitle = new PageTitle(Titles.PAGE_TITLE, 0);

  private currentPageView: CurrentPage;

  private paginator: Paginator;

  private database: DbModel = DbModel.getInstance();

  constructor(pageNumber: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageWinnersCss.PAGE_WINNERS],
      textContent: '',
    };
    super(params);

    this.pageNumber = pageNumber;
    this.currentPageView = new CurrentPage(pageNumber);

    this.paginator = new Paginator(this.pageNumber, this.prevPage.bind(this), this.nextPage.bind(this));
    this.configView();
    this.getWinnersFromDatabase();
  }

  public getWinnersFromDatabase() {
    this.database.getWinnersOnPage(
      this.createContent.bind(this),
      this.pageNumber,
      WinnersSortField.ID,
      WinnersSortOrder.ASC,
      this.ITEMS_PER_PAGE
    );
  }

  private async createContent(winnersInfos: WinnerInfo[], totalItems: number): Promise<void> {}

  private prevPage() {
    console.log('this.pageNumber: ', this.pageNumber);
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.getWinnersFromDatabase();
      this.currentPageView.setCurrentPage(this.pageNumber);
    }
    this.saveState();
  }

  private nextPage() {
    console.log('this.pageNumber: ', this.pageNumber);
    const totalPages = Math.ceil(this.totalCars / this.ITEMS_PER_PAGE);
    if (this.pageNumber < totalPages) {
      this.pageNumber += 1;
      this.getWinnersFromDatabase();
      this.currentPageView.setCurrentPage(this.pageNumber);
    }
    this.saveState();
  }

  public updateTitle(totalItems: number) {
    this.pageTitle.setItemCount(totalItems);
  }

  private configView() {
    this.getCreator().addInnerElement(this.pageTitle.getElement());
  }

  private saveState() {
    Storage.SaveWinnersPage(this.pageNumber);
  }
}
