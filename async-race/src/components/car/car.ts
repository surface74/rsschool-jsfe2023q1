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
  private element: HTMLElement;

  private carInfo: CarInfo;

  private animationId = 0;

  constructor(info: CarInfo) {
    this.carInfo = info;

    this.element = document.createElement(TagName.DIV);
    this.element.classList.add(CarCss.CAR);
    this.element.innerHTML = html;

    this.setColor(this.carInfo.color);
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
    if (this.animationId === 0) {
      this.animation(distance, time);
    }
  }

  public returnCar() {
    this.element.style.transform = '';
  }

  public stopRace() {
    if (this.animationId !== 0) {
      cancelAnimationFrame(this.animationId);
      this.animationId = 0;
    }
  }

  private animation(endX: number, duration: number) {
    let currentX = this.element.offsetLeft;
    const framesCount = (duration / 1000) * 60;
    const dX = (endX - this.element.offsetLeft) / framesCount;

    const tick = () => {
      currentX += dX;

      if (currentX < endX) {
        this.element.style.transform = `translateX(${currentX}px)`;
        this.animationId = requestAnimationFrame(tick);
      } else {
        this.stopRace();
      }
    };
    tick();
  }
}
