import './index.scss';
import Playground from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const playgroundElement = HtmlHelper.ElementFromHTML(Playground);

export default playgroundElement;
