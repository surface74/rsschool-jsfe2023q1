import './page-winners.scss';
import DefaultView from '../default-view';
import PageTitle from '../page-title/page-title';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';
import CurrentPage from '../current-page/current-page';
import Storage from '../../storage/storage';
import Paginator from '../paginator/paginator';
import DbModel, { WinnersSortField, WinnersSortOrder, WinnerInfo } from '../../db-model/db-model';
import TableHeader from '../table-header/table-header';
import Table from '../table/table';

enum PageWinnersCss {
  PAGE_WINNERS = 'page-winners',
}

enum Titles {
  PAGE_TITLE = 'WINNERS',
}

export type SortConfig = {
  field: WinnersSortField;
  order: WinnersSortOrder;
};

export default class PageWinners extends DefaultView {
  private readonly ITEMS_PER_PAGE = 10;

  private pageNumber: number = 1;

  private totalItems: number = 0;

  private pageTitle: PageTitle = new PageTitle(Titles.PAGE_TITLE, 0);

  private currentPageView: CurrentPage;

  private paginator: Paginator;

  private database: DbModel = DbModel.getInstance();

  private tableHeader: TableHeader;

  private table: Table = new Table();

  private sortConfig: SortConfig;

  private readonly defaultSortConfig: SortConfig = {
    field: WinnersSortField.ID,
    order: WinnersSortOrder.ASC,
  };

  constructor(pageNumber: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageWinnersCss.PAGE_WINNERS],
      textContent: '',
    };
    super(params);

    this.pageNumber = pageNumber;
    this.currentPageView = new CurrentPage(pageNumber);
    this.tableHeader = new TableHeader(this.sortByWins.bind(this), this.sortByBestTime.bind(this));

    this.paginator = new Paginator(this.pageNumber, this.prevPage.bind(this), this.nextPage.bind(this));
    this.configView();

    this.sortConfig = this.restoreSortConfig();
    this.getWinnersFromDatabase();
  }

  private configView() {
    this.getCreator().addInnerElement(this.pageTitle.getElement());
    this.getCreator().addInnerElement(this.currentPageView.getElement());
    this.getCreator().addInnerElement(this.tableHeader.getElement());
    this.getCreator().addInnerElement(this.table.getElement());

    this.getCreator().addInnerElement(this.paginator.getElement());
  }

  private restoreSortConfig(): SortConfig {
    const data = Storage.GetSortConfig();
    if (data) {
      const config = JSON.parse(data);
      if (config.field && config.order) {
        return config;
      }
    }
    return this.defaultSortConfig;
  }

  public getWinnersFromDatabase() {
    this.database.getWinnersOnPage(
      this.createContent.bind(this),
      this.pageNumber,
      this.sortConfig.field,
      this.sortConfig.order,
      this.ITEMS_PER_PAGE
    );
  }

  private async createContent(winnersInfos: WinnerInfo[], totalItems: number): Promise<void> {
    this.totalItems = totalItems;
    this.updateTitle(totalItems);
    this.table.fillTable(winnersInfos);
  }

  private sortByWins() {
    this.sortConfig.field = WinnersSortField.WINS;

    if (this.sortConfig.order === WinnersSortOrder.ASC) {
      this.tableHeader.setDescOrderForColumnWins();
      this.sortConfig.order = WinnersSortOrder.DESC;
    } else {
      this.tableHeader.setAscOrderForColumnWins();
      this.sortConfig.order = WinnersSortOrder.ASC;
    }

    this.getWinnersFromDatabase();
  }

  private sortByBestTime() {
    this.sortConfig.field = WinnersSortField.TIME;

    if (this.sortConfig.order === WinnersSortOrder.ASC) {
      this.tableHeader.setDescOrderForColumnBestTime();
      this.sortConfig.order = WinnersSortOrder.DESC;
    } else {
      this.tableHeader.setAscOrderForColumnBestTime();
      this.sortConfig.order = WinnersSortOrder.ASC;
    }

    this.getWinnersFromDatabase();
  }

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
    const totalPages = Math.ceil(this.totalItems / this.ITEMS_PER_PAGE);
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

  private saveState() {
    Storage.SaveWinnersPage(this.pageNumber);
    Storage.SaveSortConfig(JSON.stringify(this.sortConfig));
  }
}
