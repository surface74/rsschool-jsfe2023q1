import './index.scss';
import HeaderHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';

const headerElement = HtmlHelper.ElementFromHTML(HeaderHtml);
headerElement.append(Button({ title: 'New game', className: 'button-start' }));
headerElement.append(Button({ title: 'Restore', className: 'button-restore' }));
headerElement.append(Button({ title: 'Save', className: 'button-save' }));
headerElement.append(Button({ title: 'Pause', className: 'button-pause' }));
headerElement.append(Button({ title: 'Result', className: 'button-result' }));

export default headerElement;
