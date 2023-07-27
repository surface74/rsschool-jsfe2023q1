import './table.scss';
import DefaultView from '../default-view';
import TagName from '../../../enums/tag-name';
import DbModel, { WinnerInfo } from '../../db-model/db-model';
import Car, { CarInfo } from '../../car/car';
import { ElementParams } from '../../../utils/html-creator';

enum TableCss {
  TABLE = 'table',
  TABLE_CELL = 'table-sell',
}

export default class Table extends DefaultView {
  private database: DbModel = DbModel.getInstance();

  private winnerInfos: WinnerInfo[] = [];

  private currentPage: number = 0;

  private itemsPerPage: number = 0;

  constructor() {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [TableCss.TABLE],
      textContent: '',
    };

    super(params);
  }

  public async fillTable(winnerInfos: WinnerInfo[], currentPage: number, itemsPerPage: number) {
    this.winnerInfos = winnerInfos;
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    await this.database.getCarsByWinnerInfo(winnerInfos, this.createTableItems.bind(this));
  }

  private createTableItems(carInfos: CarInfo[]) {
    this.getElement().replaceChildren('');

    const startListNumber = (this.currentPage - 1) * this.itemsPerPage;
    carInfos.forEach((carInfo, index) => {
      const orderInTable = document.createElement(TagName.DIV);
      orderInTable.classList.add(TableCss.TABLE_CELL);
      orderInTable.textContent = String(startListNumber + index + 1);

      const car = new Car(carInfo).getCarElement();
      car.classList.add(TableCss.TABLE_CELL);

      const name = document.createElement(TagName.DIV);
      name.textContent = carInfo.name;

      const wins = document.createElement(TagName.DIV);
      wins.textContent = String(this.winnerInfos[index].wins);

      const time = document.createElement(TagName.DIV);
      time.textContent = String(this.winnerInfos[index].time);

      this.getElement().append(orderInTable, car, name, wins, time);
    });
  }
}
