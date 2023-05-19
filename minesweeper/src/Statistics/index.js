import './index.scss';
import StatisticsHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Counter from '../Counter/index.js';

const statisticsElement = HtmlHelper.ElementFromHTML(StatisticsHtml);
statisticsElement.append(Counter({ title: 'Mines', className: 'counter-mines' }));
statisticsElement.append(Counter({ title: 'Flags', className: 'counter-flags' }));
statisticsElement.append(Counter({ title: 'Steps', className: 'counter-steps' }));
statisticsElement.append(Counter({ title: 'Time', className: 'counter-time' }));

export default statisticsElement;
