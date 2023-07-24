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

  constructor() {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [TableCss.TABLE],
      textContent: '',
    };

    super(params);
  }

  public async fillTable(winnerInfos: WinnerInfo[]) {
    this.winnerInfos = winnerInfos;
    this.database.getCarsByWinnerInfo(winnerInfos, this.createTableItems.bind(this));
  }

  private createTableItems(carInfos: CarInfo[]) {
    this.getElement().replaceChildren('');
    carInfos.forEach((carInfo, index) => {
      const id = document.createElement(TagName.DIV);
      id.classList.add(TableCss.TABLE_CELL);
      id.textContent = String(carInfo.id);

      const car = new Car(carInfo).getCarElement();
      car.classList.add(TableCss.TABLE_CELL);

      const name = document.createElement(TagName.DIV);
      name.textContent = carInfo.name;

      const wins = document.createElement(TagName.DIV);
      wins.textContent = String(this.winnerInfos[index].wins);

      const time = document.createElement(TagName.DIV);
      time.textContent = String(this.winnerInfos[index].time);

      this.getElement().append(id, car, name, wins, time);
    });
  }
}
