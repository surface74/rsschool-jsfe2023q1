export default class State {
  static get STORAGE() {
    return {
      Game: 'minesweeper',
      Results: 'results',
      Config: 'config',
    };
  }

  static RestoreState(storageType) {
    return JSON.parse(localStorage.getItem(storageType));
  }

  static SaveState(storageType, state) {
    console.log('state: ', JSON.stringify(state));
    localStorage.setItem(storageType, JSON.stringify(state));
  }
}
