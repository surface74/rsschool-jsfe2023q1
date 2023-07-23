import './car-lane.scss';
import DefaultView from '../default-view';
import { CarInfo } from '../../car/car';
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

  constructor(
    carInfo: CarInfo,
    selectCarCallback: (carInfo: CarInfo) => void,
    removeCarCallback: () => void,
    startCarCallback: () => void,
    returnCarCallback: () => void
  ) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [CarLaneCss.CAR_LANE],
      textContent: '',
    };

    super(params);

    this.selectCarCallback = selectCarCallback;
    this.carInfo = { ...carInfo };
    this.carsManager = new CarsManager(this.carInfo, this.selectCarHandler.bind(this), removeCarCallback);
    this.carControl = new CarControl(startCarCallback, returnCarCallback);
    this.carTrack = new CarTrack(this.carInfo);

    this.configView();
  }

  private selectCarHandler() {
    this.selectCarCallback(this.carInfo);
  }

  private configView() {
    this.getCreator().addInnerElement(this.carsManager.getElement());
    this.carTrack.getCreator().addInnerElement(this.carControl.getElement());
    this.getCreator().addInnerElement(this.carTrack.getElement());
  }
}
