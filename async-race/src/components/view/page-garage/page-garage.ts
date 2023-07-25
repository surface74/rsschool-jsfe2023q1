import './page-garage.scss';
import DefaultView from '../default-view';
import PageTitle from '../page-title/page-title';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';
import DbModel, { RaceParams } from '../../db-model/db-model';
import CurrentPage from '../current-page/current-page';
import Car, { CarInfo } from '../../car/car';
import CarLane from '../car-lane/car-lane';
import EditView from '../edit-view/edit-view';
import LanesView from '../lanes-view/lanes-view';
import ControlsView from '../controls-view/controls-view';
import Paginator from '../paginator/paginator';
import Storage from '../../storage/storage';
import Dialog from '../../dialog/dialog';

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

  private currentPageView: CurrentPage;

  private createCarBlock: EditView;

  private updateCarBlock: EditView;

  private controlsView: ControlsView;

  private carLanesContainer: LanesView = new LanesView();

  private paginator: Paginator;

  private pageNumber: number = 1;

  private totalCars: number = 0;

  private cars: Car[] = [];

  private carLanes: CarLane[] = [];

  private winnerFound = false;

  constructor(pageNumber: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageGarrageCss.PAGE_GARAGE],
      textContent: '',
    };
    super(params);

    this.pageNumber = pageNumber;
    this.currentPageView = new CurrentPage(pageNumber);
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
    this.getCreator().addInnerElement(this.currentPageView.getElement());
    this.getCreator().addInnerElement(this.createCarBlock.getElement());
    this.getCreator().addInnerElement(this.updateCarBlock.getElement());
    this.getCreator().addInnerElement(this.controlsView.getElement());
    this.getCreator().addInnerElement(this.carLanesContainer.getElement());
    this.getCreator().addInnerElement(this.paginator.getElement());
  }

  public updateTitle(totalCars: number) {
    this.pageTitle.setItemCount(totalCars);
  }

  private configRaceUI() {
    this.controlsView.disableRaceButton();
    this.controlsView.disableCreateCarsButton();
  }

  private resetRaceUI() {
    this.controlsView.disableResetButton();
    this.controlsView.enableRaceButton();
    this.controlsView.enableCreateCarsButton();
  }

  private async raceCars() {
    this.configRaceUI();
    const promisesInfo: Promise<RaceParams>[] = [];
    this.cars.forEach((car) => {
      promisesInfo.push(this.database.startEngineSilent(car));
    });
    const raceInfos = await Promise.all(promisesInfo);

    const promisesResult: Promise<Car>[] = [];
    raceInfos.forEach((raceParam, index) => {
      const { velocity, distance } = raceParam;
      const time = distance / velocity;
      const car = this.cars[index];
      this.winnerFound = false;
      promisesResult.push(this.database.driveCar(car, this.congratsWinner.bind(this), this.stopCar.bind(this), time));
      this.startRace(car, time);
    });

    await Promise.all(promisesResult);
    this.controlsView.enableResetButton();
    this.winnerFound = false;
  }

  private congratsWinner(car: Car, time: number) {
    if (this.winnerFound) {
      return;
    }

    this.winnerFound = true;

    const message = `${car.getCarName()} went first (${(time / 1000).toFixed(2)}s)`;
    this.showCongrats(message);
    console.log('winner: ', car);
  }

  private showCongrats(message: string): void {
    const dialog = new Dialog(message).getDialog();
    this.getElement().append(dialog);
    dialog.showModal();
  }

  private resetCars() {
    this.cars.forEach((car) => {
      this.returnCar(car);
    });
    this.resetRaceUI();
  }

  private createCarsCallback() {
    this.database.createCars(this.BULK_CARS_CREATION_COUNT, this.getCarsFromDatabase.bind(this));
  }

  private prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.getCarsFromDatabase();
      this.currentPageView.setCurrentPage(this.pageNumber);
    }
    this.saveState();
  }

  private nextPage() {
    const totalPages = Math.ceil(this.totalCars / this.ITEMS_PER_PAGE);
    if (this.pageNumber < totalPages) {
      this.pageNumber += 1;
      this.getCarsFromDatabase();
      this.currentPageView.setCurrentPage(this.pageNumber);
    }
    this.saveState();
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

  private async createContent(carInfos: CarInfo[], totalCars: number): Promise<void> {
    this.cars.length = 0;
    this.carLanes.length = 0;
    this.carLanesContainer.getElement().replaceChildren('');

    carInfos.forEach((carInfo) => {
      const carLane = new CarLane(
        carInfo,
        this.selectCar.bind(this),
        this.removeCar.bind(this),
        this.startEngine.bind(this),
        this.returnCar.bind(this)
      );
      this.cars.push(carLane.getCar());
      this.carLanes.push(carLane);
      this.carLanesContainer.getCreator().addInnerElement(carLane.getElement());
    });

    this.totalCars = totalCars;
    this.updateTitle(totalCars);
  }

  private async selectCar(carInfo: CarInfo) {
    this.updateCarBlock.setViewValues(carInfo);
  }

  private async removeCar(carId: number) {
    this.database.deleteWinner(carId);
    this.database.deleteCar(carId, this.removeCarCallback.bind(this));
  }

  private async removeCarCallback() {
    this.getCarsFromDatabase();
  }

  private startEngine(car: Car) {
    this.database.startEngine(car, this.engineStarted.bind(this));
  }

  private async engineStarted(raceParam: RaceParams, car: Car) {
    const { velocity, distance } = raceParam;
    const time = distance / velocity;

    this.database.driveCar(car, () => console.log('OK'), this.stopCar.bind(this), time);

    this.startRace(car, time);
  }

  private startRace(car: Car, time: number) {
    const trackWidth = this.carLanesContainer.getElement().getBoundingClientRect().width;
    const carOffsetLeft = car.getCarElement().getBoundingClientRect().left;
    const distance = trackWidth - carOffsetLeft;
    car.startRace(distance, time);
  }

  private async stopCar(car: Car) {
    car.stopRace();
  }

  private async returnCar(car: Car) {
    await this.database.stopCar(car.getCarId());
    car.stopRace();
    car.returnCar();
  }

  private saveState() {
    Storage.SaveGaragePage(this.pageNumber);
  }
}
