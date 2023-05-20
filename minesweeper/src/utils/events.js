export default class Events {
  constructor() {
    this.winEvent = new Event('win', { bubbles: true });
    this.loseEvent = new Event('lose', { bubbles: true });
    this.pauseEvent = new Event('pause', { bubbles: true });
    this.newGameEvent = new Event('newgame', { bubbles: true });
  }

  get WIN() {
    return this.winEvent;
  }

  get LOSE() {
    return this.loseEvent;
  }

  get PAUSE() {
    return this.pauseEvent;
  }

  get NEWGAME() {
    return this.newGameEvent;
  }
}
