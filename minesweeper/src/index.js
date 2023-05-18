import icons from './Favicon/index.js';
import Game from './Game/index.js';

icons.forEach((icon) => document.head.append(icon));

const game = new Game();

game.init(25, 10);
