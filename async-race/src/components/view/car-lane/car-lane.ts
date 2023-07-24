import './car-lane.scss';
import DefaultView from '../default-view';
import Car, { CarInfo } from '../../car/car';
import CarsManager from '../cars-manager/cars-manager';
import CarControl from '../car-control/car-control';
import CarTrack from '../car-track/car-track';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';

enum CarLaneCss {
  CAR_LANE = 'car-lane',
}

export default class CarLane extends DefaultView {
  private carInfo: CarInfo;

  private carsManager: CarsManager;

  private carControl: CarControl;

  private carTrack: CarTrack;

  private selectCarCallback: (carInfo: CarInfo) => void;

  private removeCarCallback: (carId: number) => void;

  private startCarCallback: (car: Car) => void;

  private returnCarCallback: (car: Car) => void;

  constructor(
    carInfo: CarInfo,
    selectCarCallback: (carInfo: CarInfo) => void,
    removeCarCallback: (carId: number) => void,
    startCarCallback: (car: Car) => void,
    returnCarCallback: (car: Car) => void
  ) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [CarLaneCss.CAR_LANE],
      textContent: '',
    };

    super(params);

    this.selectCarCallback = selectCarCallback;
    this.removeCarCallback = removeCarCallback;
    this.startCarCallback = startCarCallback;
    this.returnCarCallback = returnCarCallback;

    this.carInfo = { ...carInfo };
    this.carsManager = new CarsManager(
      this.carInfo,
      this.selectCarHandler.bind(this),
      this.removeCarHandler.bind(this)
    );
    this.carTrack = new CarTrack(this.carInfo);
    this.carControl = new CarControl(this.startCarHandler.bind(this), this.returnCarHandler.bind(this));

    this.configView();
  }

  private startCarHandler() {
    this.carControl.disableStartButton();
    this.carControl.enableReturnButton();
    this.startCarCallback(this.carTrack.getCar());
  }

  private returnCarHandler() {
    this.carControl.disableReturnButton();
    this.carControl.enableStartButton();
    this.returnCarCallback(this.carTrack.getCar());
  }

  private selectCarHandler() {
    this.selectCarCallback(this.carInfo);
  }

  private removeCarHandler() {
    this.removeCarCallback(this.carInfo.id);
  }

  private configView() {
    this.getCreator().addInnerElement(this.carsManager.getElement());
    this.carTrack.getCreator().addInnerElement(this.carControl.getElement());
    this.getCreator().addInnerElement(this.carTrack.getElement());
  }
}
