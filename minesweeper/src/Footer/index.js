import './index.scss';
import FooterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';

const footerElement = HtmlHelper.ElementFromHTML(FooterHtml);
footerElement.append(Button({ title: 'New game', className: 'button-start' }));
footerElement.append(Button({ title: 'Restore', className: 'button-restore' }));
footerElement.append(Button({ title: 'Save', className: 'button-save' }));
footerElement.append(Button({ title: 'Pause', className: 'button-pause' }));
footerElement.append(Button({ title: 'Result', className: 'button-result' }));

export default footerElement;
