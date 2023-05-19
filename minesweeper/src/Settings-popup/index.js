import './index.scss';
import SettingsHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';

const statisticsElement = HtmlHelper.ElementFromHTML(SettingsHtml);
statisticsElement.append(Button({ title: 'Easy', className: 'button-difficulty-easy' }));
statisticsElement.append(Button({ title: 'Medium', className: 'button-difficulty-medium' }));
statisticsElement.append(Button({ title: 'Hard', className: 'button-difficulty-hard' }));

export default statisticsElement;
