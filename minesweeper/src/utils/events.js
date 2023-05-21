export default class Events {
  constructor() {
    this.ID = {
      NEWGAME: 'newgame',
      WIN: 'win',
      LOSE: 'lose',
      PAUSE: 'pause',
    };
  }

  getEvent(idEvent, value) {
    const events = Array.from(Object.entries(this.ID));
    for (let i = 0; i < events.length; i += 1) {
      const [, event] = events[i];
      if (event === idEvent) {
        return new CustomEvent(idEvent, { bubbles: true, detail: value });
      }
    }
    return null;
  }
}
