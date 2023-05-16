import './styles/base/_normalize.scss';
import './styles/base/_common.scss';
import './styles/layout/_wrapper.scss';

import Playground from './Playground/playground.js';
import playgroundElement from './Playground/index.js';

document.body.append(playgroundElement);

const playground = new Playground();
playground.init(10, 10);
