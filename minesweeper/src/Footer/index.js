import './index.scss';
import FooterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Sound from '../Sound/index.js';

const footerElement = HtmlHelper.ElementFromHTML(FooterHtml);
footerElement.append(Sound({}));

export default footerElement;
