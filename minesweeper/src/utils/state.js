export default class State {
  static get STORAGE() {
    return {
      Game: 'minesweeper',
      Results: 'results',
    };
  }

  static RestoreState(storageType) {
    return JSON.parse(JSON.parse(localStorage.getItem(storageType)));
  }

  static SaveState(storageType, state) {
    localStorage.setItem(storageType, JSON.stringify(state));
  }
}
