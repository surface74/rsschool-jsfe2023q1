import './car.scss';
import html from './car.html';
import MyMath from '../../utils/my-math';
import TagName from '../../enums/tag-name';
import carModels from '../view/car-models/car-models';

enum CarCss {
  CAR = 'car',
}

export type CarInfo = {
  id: number;
  name: string;
  color: string;
};

export default class Car {
  static readonly FAKE_CAR_ID = -1;

  private readonly INIT_REQUEST_ID = 0;

  private readonly DISPLAY_UPDATE_FREQUENCE = 16;

  private element: HTMLElement;

  private carInfo: CarInfo;

  private animationId = this.INIT_REQUEST_ID;

  constructor(info: CarInfo) {
    this.carInfo = info;

    this.element = document.createElement(TagName.DIV);
    this.element.classList.add(CarCss.CAR);
    this.element.innerHTML = html;

    this.setColor(this.carInfo.color);
  }

  public static getDefaultCarInfo(): CarInfo {
    return {
      id: Car.FAKE_CAR_ID,
      name: '',
      color: 'black',
    };
  }

  public static getRandomCarInfo(): CarInfo {
    return {
      id: Car.FAKE_CAR_ID,
      name: this.getRandomCarName(),
      color: carModels.color[MyMath.getRandom(0, carModels.color.length - 1)],
    };
  }

  public getCarElement() {
    return this.element;
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
    this.element.style.fill = color;
  }

  public setName(name: string): void {
    this.carInfo.name = name;
  }

  public setId(id: number): void {
    this.carInfo.id = id;
  }

  public setCarInfo(info: CarInfo) {
    this.setColor(info.color);
    this.setId(info.id);
    this.setName(info.name);
  }

  public startRace(distance: number, time: number) {
    if (this.animationId === this.INIT_REQUEST_ID) {
      this.animation(distance, time);
    }
  }

  public returnCar() {
    this.element.style.transform = '';
  }

  public stopRace() {
    if (this.animationId !== this.INIT_REQUEST_ID) {
      cancelAnimationFrame(this.animationId);
      this.animationId = this.INIT_REQUEST_ID;
    }
  }

  private animation(trackLength: number, duration: number) {
    let currentX = 0;
    const framesCount = duration / this.DISPLAY_UPDATE_FREQUENCE;
    const dX = trackLength / framesCount;

    const tick = () => {
      currentX += dX;
      if (currentX < trackLength) {
        this.element.style.transform = `translateX(${currentX}px)`;
        this.animationId = requestAnimationFrame(tick);
      } else {
        this.stopRace();
      }
    };
    tick();
  }

  private static getRandomCarName(): string {
    const part1 = carModels.mark[MyMath.getRandom(0, carModels.mark.length - 1)];
    const part2 = carModels.model[MyMath.getRandom(0, carModels.model.length - 1)];

    return `${part1} ${part2}`;
  }
}
