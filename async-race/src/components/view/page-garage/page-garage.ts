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
import ControlsView from '../controls-view/controls-view';
import Paginator from '../paginator/paginator';

enum PageGarrageCss {
  PAGE_GARAGE = 'page-garage',
}

enum Titles {
  PAGE_TITLE = 'GARAGE',
  BUTTON_CREATE_TITLE = 'Create',
  BUTTON_UPDATE_TITLE = 'Update',
}

export default class PageGarrage extends DefaultView {
  private readonly ITEMS_PER_PAGE = 7;

  private readonly BULK_CARS_CREATION_COUNT = 100;

  private database: DbModel = DbModel.getInstance();

  private pageTitle: PageTitle = new PageTitle(Titles.PAGE_TITLE, 0);

  private currentPage: CurrentPage;

  private createCarBlock: EditView;

  private updateCarBlock: EditView;

  private controlsView: ControlsView;

  private carLanesContainer: LanesView = new LanesView();

  private paginator: Paginator;

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
    this.controlsView = new ControlsView(
      this.raceCars.bind(this),
      this.resetCars.bind(this),
      this.createCarsCallback.bind(this)
    );

    this.paginator = new Paginator(this.pageNumber, this.prevPage.bind(this), this.nextPage.bind(this));
    this.configView();
    this.getCarsFromDatabase();
  }

  private configView() {
    this.getCreator().addInnerElement(this.pageTitle.getElement());
    this.getCreator().addInnerElement(this.currentPage.getElement());
    this.getCreator().addInnerElement(this.createCarBlock.getElement());
    this.getCreator().addInnerElement(this.updateCarBlock.getElement());
    this.getCreator().addInnerElement(this.controlsView.getElement());
    this.getCreator().addInnerElement(this.carLanesContainer.getElement());
    this.getCreator().addInnerElement(this.paginator.getElement());
  }

  public updateTitle(totalCars: number) {
    this.pageTitle.setItemCount(totalCars);
  }

  private raceCars() {
    console.log('RACE!', this.cars);
  }

  private resetCars() {
    console.log('RESET!', this.cars);
  }

  private createCarsCallback() {
    this.database.createCars(this.BULK_CARS_CREATION_COUNT, this.getCarsFromDatabase.bind(this));
  }

  private prevPage() {
    console.log('PREV PAGE!', this.cars);
  }

  private nextPage() {
    console.log('NEXT PAGE!', this.cars);
  }

  public getCarsFromDatabase() {
    this.database.getCarsOnPage(this.createContent.bind(this), this.pageNumber, this.ITEMS_PER_PAGE);
  }

  private createCar(): void {
    const carInfo = this.createCarBlock.getViewValues();
    if (carInfo.name.length > 1) {
      this.database.createCar(carInfo, this.createCarCallback.bind(this));
    }
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
      const carLane = new CarLane(
        carInfo,
        this.selectCar.bind(this),
        this.removeCar.bind(this),
        this.startCar.bind(this),
        this.returnCar.bind(this)
      );
      this.carLanes.push(carLane);
      this.carLanesContainer.getCreator().addInnerElement(carLane.getElement());
    });

    this.updateTitle(totalCars);
  }

  private async selectCar(carInfo: CarInfo) {
    this.updateCarBlock.setViewValues(carInfo);
  }

  private async removeCar(carId: number) {
    this.database.deleteCar(carId, this.removeCarCallback.bind(this));
  }

  private async removeCarCallback() {
    this.getCarsFromDatabase();
  }

  private async startCar() {
    console.log('start', this);
  }

  private async returnCar() {
    console.log('return', this);
  }
}
