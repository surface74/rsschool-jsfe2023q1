import './index.scss';
import Playground from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const playgroundElement = HtmlHelper.ElementFromHTML(Playground);
playgroundElement.classList.add('playground_easy');

export default playgroundElement;
