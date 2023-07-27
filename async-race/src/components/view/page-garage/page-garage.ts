import './page-garage.scss';
import DefaultView from '../default-view';
import PageTitle from '../page-title/page-title';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';
import DbModel, { RaceParams, WinnerInfo } from '../../db-model/db-model';
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
      this.resetGarageState.bind(this),
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
    this.carLanes.forEach((lane) => lane.disableSelectRemoveButtons());
  }

  private resetRaceUI() {
    this.controlsView.disableResetButton();
    this.controlsView.enableRaceButton();
    this.controlsView.enableCreateCarsButton();
    this.carLanes.forEach((lane) => lane.enableSelectRemoveButtons());
  }

  private async raceCars() {
    this.configRaceUI();
    await this.resetCars();

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

      promisesResult.push(this.database.driveCar(car, this.processWinner.bind(this), car.stopRace.bind(car), time));
      this.startRace(car, time);
    });

    await Promise.all(promisesResult);
    this.controlsView.enableResetButton();
    this.winnerFound = false;
  }

  private processWinner(car: Car, time: number) {
    if (this.winnerFound) {
      return;
    }

    this.winnerFound = true;

    const winnerTime = +(time / 1000).toFixed(2);
    const message = `${car.getCarName()} went first (${winnerTime}s)`;
    PageGarrage.showCongrats(message);

    this.checkWinnersList(car, winnerTime);
  }

  private checkWinnersList(car: Car, time: number) {
    this.database.getWinner(car, this.updateWinners.bind(this), time);
  }

  private updateWinners(car: Car, winnerInfo: WinnerInfo, time: number) {
    if (winnerInfo.id) {
      const updateWinnerInfo: WinnerInfo = { ...winnerInfo };
      updateWinnerInfo.wins += 1;
      if (winnerInfo.time > time) {
        updateWinnerInfo.time = time;
      }
      this.database.updateWinner(updateWinnerInfo);
    } else {
      const newWinnerInfo: WinnerInfo = {
        id: car.getCarId(),
        time,
        wins: 1,
      };
      this.database.createWinner(newWinnerInfo);
    }
  }

  static showCongrats(message: string): void {
    const dialog = new Dialog(message).getDialog();
    document.body.append(dialog);
    dialog.showModal();
  }

  private async resetGarageState() {
    await this.resetCars();

    this.resetRaceUI();
  }

  private async resetCars() {
    const promises: Promise<void>[] = [];
    this.cars.forEach((car) => {
      promises.push(this.returnCar(car));
    });
    await Promise.all(promises);

    this.carLanes.forEach((carLane) => carLane.restoreButtonState());
  }

  private createCarsCallback() {
    this.database.createCars(this.BULK_CARS_CREATION_COUNT, this.getCarsFromDatabase.bind(this));
  }

  private prevPage() {
    if (this.pageNumber > 1) {
      this.updateCarBlock.clear();
      this.createCarBlock.clear();
      this.pageNumber -= 1;
      this.getCarsFromDatabase();
      this.currentPageView.setCurrentPage(this.pageNumber);
    }
    this.saveState();
  }

  private nextPage() {
    const totalPages = Math.ceil(this.totalCars / this.ITEMS_PER_PAGE);
    if (this.pageNumber < totalPages) {
      this.updateCarBlock.clear();
      this.createCarBlock.clear();
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
      this.totalCars += 1;
    }
  }

  private createCarCallback(carInfo: CarInfo) {
    this.createCarBlock.clear();
    if (this.carLanes.length < this.ITEMS_PER_PAGE) {
      const carLane = this.createLane(carInfo);
      this.carLanesContainer.getCreator().addInnerElement(carLane.getElement());
    }
  }

  private updateCar(): void {
    const carInfo = this.updateCarBlock.getViewValues();
    this.database.updateCar(carInfo, this.updateCarCallback.bind(this));
  }

  private updateCarCallback(carInfo: CarInfo) {
    this.updateCarBlock.clear();

    for (let i = 0; i < this.cars.length; i += 1) {
      const car = this.cars[i];
      if (car.getCarId() === carInfo.id) {
        this.carLanes[i].setCarInfo(carInfo);
        break;
      }
    }
  }

  private createContent(carInfos: CarInfo[], totalCars: number) {
    this.cars.length = 0;
    this.carLanes.length = 0;
    this.carLanesContainer.getElement().replaceChildren('');

    carInfos.forEach((carInfo) => {
      const carLane = this.createLane(carInfo);
      this.carLanesContainer.getCreator().addInnerElement(carLane.getElement());
    });

    this.totalCars = totalCars;
    this.updateTitle(totalCars);
  }

  createLane(carInfo: CarInfo): CarLane {
    const carLane = new CarLane(
      carInfo,
      this.selectCar.bind(this),
      this.removeCar.bind(this),
      this.startEngine.bind(this),
      this.returnCar.bind(this)
    );
    this.cars.push(carLane.getCar());
    this.carLanes.push(carLane);

    return carLane;
  }

  private selectCar(carInfo: CarInfo) {
    this.updateCarBlock.setViewValues(carInfo);
  }

  private removeCar(carId: number) {
    this.database.deleteWinner(carId);
    this.database.deleteCar(carId, this.removeCarCallback.bind(this));
  }

  private removeCarCallback() {
    this.getCarsFromDatabase();
  }

  private startEngine(car: Car) {
    this.database.startEngine(car, this.engineStarted.bind(this));
  }

  private engineStarted(raceParam: RaceParams, car: Car) {
    const { velocity, distance } = raceParam;
    const time = distance / velocity;

    this.database.driveCar(car, () => {}, car.stopRace.bind(car), time);

    this.startRace(car, time);
  }

  private startRace(car: Car, time: number) {
    const trackWidth = this.carLanesContainer.getElement().getBoundingClientRect().width;
    const carWidth = car.getCarElement().getBoundingClientRect().width;
    const carOffsetLeft = Number.parseFloat(window.getComputedStyle(car.getCarElement()).left);

    const distance = trackWidth - carOffsetLeft - carWidth;
    car.startRace(distance, time);
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
