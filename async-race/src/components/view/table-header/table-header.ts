import './table-header.scss';
import DefaultView from '../default-view';
import TagName from '../../../enums/tag-name';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import { ElementParams } from '../../../utils/html-creator';

enum TableHeaderCss {
  TABLE_HEADER = 'table-header',
  BUTTON_DISABLED = 'button_disabled',
}

enum ButtonTitle {
  ID = '#',
  CAR = 'Car',
  NAME = 'Name',
  WINS = 'Wins',
  BEST_TIME = 'Best time (s)',
}

enum SortOrderSymbol {
  ASC = '▲',
  DESC = '▼',
}

export default class TableHeader extends DefaultView {
  private headerButtonId: Button;

  private headerButtonCar: Button;

  private headerButtonName: Button;

  private headerButtonWins: Button;

  private headerButtonBestTime: Button;

  constructor(sortByWins: () => void, sortByBestTime: () => void) {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [TableHeaderCss.TABLE_HEADER],
      textContent: '',
    };

    super(params);

    this.headerButtonId = this.createButtonId(ButtonTitle.ID, () => {});
    this.headerButtonCar = this.createButtonCar(ButtonTitle.CAR, () => {});
    this.headerButtonName = this.createButtonName(ButtonTitle.NAME, () => {});
    this.headerButtonWins = this.createButtonWins(ButtonTitle.WINS, sortByWins);
    this.headerButtonBestTime = this.createButtonTime(ButtonTitle.BEST_TIME, sortByBestTime);

    this.configView();
  }

  public setAscOrderForColumnWins() {
    this.headerButtonWins.getElement().textContent = `${ButtonTitle.WINS} ${SortOrderSymbol.ASC}`;
    this.headerButtonBestTime.getElement().textContent = `${ButtonTitle.BEST_TIME}`;
  }

  public setDescOrderForColumnWins() {
    this.headerButtonWins.getElement().textContent = `${ButtonTitle.WINS} ${SortOrderSymbol.DESC}`;
    this.headerButtonBestTime.getElement().textContent = `${ButtonTitle.BEST_TIME}`;
  }

  public setAscOrderForColumnBestTime() {
    this.headerButtonBestTime.getElement().textContent = `${ButtonTitle.BEST_TIME} ${SortOrderSymbol.ASC}`;
    this.headerButtonWins.getElement().textContent = `${ButtonTitle.WINS}`;
  }

  public setDescOrderForColumnBestTime() {
    this.headerButtonBestTime.getElement().textContent = `${ButtonTitle.BEST_TIME} ${SortOrderSymbol.DESC}`;
    this.headerButtonWins.getElement().textContent = `${ButtonTitle.WINS}`;
  }

  private configView() {
    this.getCreator().addInnerElement(this.headerButtonId.getElement());
    this.getCreator().addInnerElement(this.headerButtonCar.getElement());
    this.getCreator().addInnerElement(this.headerButtonName.getElement());
    this.getCreator().addInnerElement(this.headerButtonWins.getElement());
    this.getCreator().addInnerElement(this.headerButtonBestTime.getElement());
  }

  private createButtonTime(text: string, callback: () => void) {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: text,
      callback,
    };

    this.headerButtonBestTime = new Button(params);
    return this.headerButtonBestTime;
  }

  private createButtonWins(text: string, callback: () => void) {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: text,
      callback,
    };

    this.headerButtonWins = new Button(params);
    return this.headerButtonWins;
  }

  private createButtonId(text: string, callback: () => void) {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON, TableHeaderCss.BUTTON_DISABLED],
      textContent: text,
      callback,
    };

    this.headerButtonId = new Button(params);
    return this.headerButtonId;
  }

  private createButtonCar(text: string, callback: () => void) {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON, TableHeaderCss.BUTTON_DISABLED],
      textContent: text,
      callback,
    };

    this.headerButtonCar = new Button(params);
    return this.headerButtonCar;
  }

  private createButtonName(text: string, callback: () => void) {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON, TableHeaderCss.BUTTON_DISABLED],
      textContent: text,
      callback,
    };

    this.headerButtonName = new Button(params);
    return this.headerButtonName;
  }
}
