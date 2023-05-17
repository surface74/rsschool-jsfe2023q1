import './styles/base/_normalize.scss';
import './styles/base/_common.scss';
import './styles/layout/_wrapper.scss';
import icons from './Favicon/index.js';
import Playground from './Playground/playground.js';
import playgroundElement from './Playground/index.js';

icons.forEach((icon) => document.head.append(icon));

document.body.append(playgroundElement);

const playground = new Playground();
playground.init(10, 10);
