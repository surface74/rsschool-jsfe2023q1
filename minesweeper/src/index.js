import './styles/base/_normalize.scss';
import './styles/base/_common.scss';
import './styles/layout/_wrapper.scss';

import HtmlHelper from './utils/html-helper.js';

import Playground from './Playground/playground.js';
import playgroundElement from './Playground/index.js';

const icon = HtmlHelper.ElementFromHTML('<link rel="shortcut icon" href="./favicon.ico" type="image/x-icon">');
document.head.append(icon);

document.body.append(playgroundElement);

const playground = new Playground();
playground.init(10, 10);
