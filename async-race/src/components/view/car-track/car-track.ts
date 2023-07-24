import './car-track.scss';
import DefaultView from '../default-view';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import Car, { CarInfo } from '../../car/car';

enum CarTrackCss {
  CAR_TRACK = 'car-track',
}

export default class CarTrack extends DefaultView {
  private car: Car;

  constructor(carInfo: CarInfo) {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [CarTrackCss.CAR_TRACK],
      textContent: '',
    };
    super(params);

    this.car = new Car(carInfo);

    this.getCreator().addInnerElement(this.car.getCarElement());
  }

  public getCar() {
    return this.car;
  }

  public getTrackElement() {
    return this.getElement();
  }

  public getCarElement() {
    return this.car.getCarElement();
  }

  public setCarInfo(info: CarInfo) {
    this.car.setCarInfo(info);
  }
}
