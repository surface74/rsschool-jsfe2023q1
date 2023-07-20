import './car.scss';
import html from './car.html';
import TagName from '../../enums/tag-name';

enum CarCss {
  CAR = 'car',
}

export type CarInfo = {
  id: number;
  name: string;
  color: string;
};

export default class Car {
  private car: HTMLElement;

  private carInfo: CarInfo;

  constructor(info: CarInfo) {
    this.carInfo = info;

    this.car = document.createElement(TagName.DIV);
    this.car.classList.add(CarCss.CAR);
    this.car.innerHTML = html;

    this.setColor(this.carInfo.color);
  }

  public getCar() {
    return this.car;
  }

  public getCarName(): string {
    return this.carInfo.name;
  }

  public getCarColor(): string {
    return this.carInfo.color;
  }

  public getCarId(): number {
    return this.carInfo.id;
  }

  public setColor(color: string): void {
    this.carInfo.color = color;
    this.car.style.fill = color;
  }

  public setName(name: string): void {
    this.carInfo.name = name;
  }

  public setId(id: number): void {
    this.carInfo.id = id;
  }
}
