export default class State {
  static RestoreState() {
    return JSON.parse(JSON.parse(localStorage.getItem('minesweeper')));
  }

  static SaveState(state) {
    localStorage.setItem('minesweeper', JSON.stringify(state));
  }
}
