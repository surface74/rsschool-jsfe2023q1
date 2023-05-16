import Playground from './Playground.js';

function getTestField() {
  return [
    [{ state: 0, content: 0, id: 0 }, { state: 0, content: 0, id: 1 }, { state: 0, content: 1000, id: 2 }],
    [{ state: 0, content: 1000, id: 3 }, { state: 0, content: 0, id: 4 }, { state: 0, content: 0, id: 5 }],
    [{ state: 0, content: 1000, id: 6 }, { state: 0, content: 0, id: 7 }, { state: 0, content: 0, id: 8 }],
  ];
}

const playground = new Playground();
playground.init(3, 3);
playground.initMines(5);

playground.mines = [{ row: 0, column: 2 }, { row: 1, column: 0 }, { row: 2, column: 0 }];
playground.fields = getTestField();

playground.markMineNeighbors();
console.log('playground.getField(): ', playground.getField());

console.log('playground.getMines(): ', playground.getMines());

// const results = [];
// for (let index = 0; index < 10; index++) {
//   results.push(playground.getExcludeRandom(0, 9, 6));
// }
// console.log('results: ', results.join(', '));
