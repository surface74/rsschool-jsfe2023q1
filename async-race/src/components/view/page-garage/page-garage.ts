import './page-garage.scss';
import DefaultView from '../default-view';
import PageTitle from '../page-title/page-title';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';
import DbModel from '../../db-model/db-model';
import CurrentPage from '../current-page/current-page';
import { CarInfo } from '../../car/car';
import CarLane from '../car-lane/car-lane';
import EditView from '../edit-view/edit-view';
import LanesView from '../lanes-view/lanes-view';

enum PageGarrageCss {
  PAGE_GARAGE = 'page-garage',
}

enum Titles {
  PAGE_TITLE = 'GARAGE',
  BUTTON_CREATE_TITLE = 'Create',
  BUTTON_UPDATE_TITLE = 'Update',
}

export default class PageGarrage extends DefaultView {
  private database: DbModel = DbModel.getInstance();

  private pageTitle: PageTitle = new PageTitle(Titles.PAGE_TITLE, 0);

  private currentPage: CurrentPage;

  private createCarBlock: EditView;

  private updateCarBlock: EditView;

  private carLanesContainer: LanesView = new LanesView();

  private pageNumber: number;

  private cars: CarInfo[] = [];

  private carLanes: CarLane[] = [];

  constructor(pageNumber: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageGarrageCss.PAGE_GARAGE],
      textContent: '',
    };
    super(params);

    this.pageNumber = pageNumber;
    this.currentPage = new CurrentPage(pageNumber + 1);
    this.createCarBlock = new EditView(Titles.BUTTON_CREATE_TITLE, this.createCar.bind(this));
    this.updateCarBlock = new EditView(Titles.BUTTON_UPDATE_TITLE, this.updateCar.bind(this));

    this.configView();
    this.getCarsFromDatabase();
  }

  private configView() {
    this.getCreator().addInnerElement(this.pageTitle.getElement());
    this.getCreator().addInnerElement(this.currentPage.getElement());
    this.getCreator().addInnerElement(this.createCarBlock.getElement());
    this.getCreator().addInnerElement(this.updateCarBlock.getElement());
    this.getCreator().addInnerElement(this.carLanesContainer.getElement());
  }

  public updateTitle(totalCars: number) {
    this.pageTitle.setItemCount(totalCars);
  }

  public getCarsFromDatabase() {
    this.database.getCarsOnPage(this.createContent.bind(this), this.pageNumber);
  }

  private createCar(): void {
    const carInfo = this.createCarBlock.getViewValues();
    this.database.createCar(carInfo, this.createCarCallback.bind(this));
  }

  private async createCarCallback(): Promise<void> {
    this.createCarBlock.clearInput();
    this.getCarsFromDatabase();
  }

  private updateCar(): void {
    const carInfo = this.updateCarBlock.getViewValues();
    this.database.updateCar(carInfo, this.updateCarCallback.bind(this));
  }

  private async updateCarCallback(): Promise<void> {
    this.updateCarBlock.clearInput();
    this.getCarsFromDatabase();
  }

  private async createContent(cars: CarInfo[], totalCars: number): Promise<void> {
    this.cars = cars;
    this.carLanes.length = 0;
    this.carLanesContainer.getElement().replaceChildren('');

    this.cars.forEach((carInfo) => {
      const carLane = new CarLane(carInfo, this.selectCar.bind(this), this.removeCar, this.startCar, this.returnCar);
      this.carLanes.push(carLane);
      this.carLanesContainer.getCreator().addInnerElement(carLane.getElement());
    });

    this.updateTitle(totalCars);
  }

  private async selectCar(carInfo: CarInfo) {
    this.updateCarBlock.setViewValues(carInfo);
  }

  private async removeCar() {
    console.log('remove', this);
  }

  private async startCar() {
    console.log('start', this);
  }

  private async returnCar() {
    console.log('return', this);
  }
}
