import Counter from '../Counter/index.js';

export default class Timer {
  constructor() {
    this.intervalID = null;
    this.startTime = null;
    this.passedTime = 0;
    this.resumedTime = 0;
    this.element = new Counter({ title: 'Time', className: 'counter-time' });
    this.element.value = '00:00';
  }

  restoreState(savedTime) {
    this.resumedTime = savedTime;
  }

  getElement() {
    return this.element.getElement();
  }

  get value() {
    return this.passedTime;
  }

  set value(value) {
    this.element.value = value;
  }

  reset() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = 0;
      this.startTime = null;
      this.passedTime = 0;
      this.resumedTime = 0;
      this.value = this.toString();
    }
  }

  start() {
    this.startTime = Date.now();
    this.intervalID = setInterval(
      () => {
        this.passedTime = Date.now() - this.startTime + this.resumedTime;
        this.value = this.toString();
      }, 1000);
  }

  stop() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  toString() {
    const seconds = Math.trunc(this.passedTime * 0.001);
    const hours = Math.trunc(seconds / 3600);
    const mins = Math.trunc((seconds - hours * 3600) / 60);
    const secs = seconds % 60;
    return `${(mins < 10) ? `0${mins}` : mins} : ${(secs < 10) ? `0${secs}` : secs}`;
  }
}
