import STATE from '../Field/const-state.js';
import CONTENT from '../Field/const-content.js';
import SIZE from './const-size.js';
import Field from '../Field/index.js';
import Element from './index.js';

export default class Playground {
  init(size, minesCount) {
    this.field = new Field();
    this.size = size;
    this.minesCount = minesCount;
    this.fields = [];
    this.mines = [];
    this.openedField = 0;
    this.markedField = 0;
    this.initContent();

    this.element = this.getResizedElement(Element);
    this.fillPlaygroundElement(this.element);
  }

  initContent() {
    for (let i = 0; i < this.size; i += 1) {
      this.fields.push(Array.from({ length: this.size })
        .map((item, index) => ({
          state: STATE.Hidden,
          content: CONTENT.Free,
          id: (i * this.size) + index,
        })));
    }
  }

  initMines(excludeId) {
    for (let i = 0; i < this.minesCount; i += 1) {
      const random = this.getExcludeRandom(0, this.fields.length ** 2 - 1, +excludeId);
      const position = this.getPosition(random);
      this.fields[position.row][position.column].content = CONTENT.Mine;
      this.mines.push(position);
    }

    this.countMineNeighbors();
    this.openedField = 0;
    this.markedField = 0;
  }

  getResizedElement(element) {
    switch (this.size) {
      case SIZE.Medium:
        element.classList.add('playground_medium');
        break;
      case SIZE.Hard:
        element.classList.add('playground_hard');
        break;
      default:
        element.classList.add('playground_easy');
        break;
    }
    return element;
  }

  fillPlaygroundElement(element) {
    for (let i = 0; i < this.size ** 2; i += 1) {
      element.append(this.field.getField(STATE.Hidden, i));
    }
  }

  isWinPosition() {
    return this.size ** 2 - this.openedField === this.markedField;
  }

  getPosition(linearIndex) {
    const column = +linearIndex % this.size;
    const row = Math.floor(+linearIndex / this.size);
    return { row, column };
  }

  countMineNeighbors() {
    for (let i = 0; i < this.mines.length; i += 1) {
      const neighbors = this.getFieldHeighbors(this.mines[i]);
      neighbors.forEach((position) => { this.fields[position.row][position.column].content += 1; });
    }
  }

  getFieldHeighbors({ row, column }) {
    const neighbors = [];
    if (row > 0 && column > 0) { neighbors.push({ row: row - 1, column: column - 1 }); }
    if (row > 0) { neighbors.push({ row: row - 1, column }); }
    if (row > 0 && column < this.size - 1) { neighbors.push({ row: row - 1, column: column + 1 }); }
    if (column > 0) { neighbors.push({ row, column: column - 1 }); }
    if (column > 0 && row < this.size - 1) { neighbors.push({ row: row + 1, column: column - 1 }); }
    if (row < this.size - 1) { neighbors.push({ row: row + 1, column }); }
    if (row < this.size - 1 && column < this.size - 1) { neighbors.push({ row: row + 1, column: column + 1 }); }
    if (column < this.size - 1) { neighbors.push({ row, column: column + 1 }); }

    return neighbors;
  }

  getExcludeRandom(min, max, exclude) {
    if (+exclude < min || +exclude > max) {
      return null;
    }

    let result;
    do {
      result = Math.floor(min + Math.random() * (max - min + 1));
    } while (result === +exclude || this.mines.map(({ row, column }) => row * this.size + column).includes(result));

    return result;
  }

  getFieldData(fieldId) {
    const { row, column } = this.getPosition(+fieldId);
    return this.fields[row][column];
  }

  setFieldState(fieldId, state) {
    const { row, column } = this.getPosition(+fieldId);
    this.fields[row][column].state = state;
    if (state === STATE.Open) {
      this.openedField += 1;
    }
    if (state === STATE.Marked) {
      this.markedField += 1;
    }
  }

  getMines() {
    return this.mines;
  }

  getField() {
    return this.fields;
  }
}
