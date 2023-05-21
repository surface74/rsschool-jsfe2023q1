import './index.scss';
import StatisticsHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Counter from '../Counter/index.js';

export default class Statistics {
  constructor() {
    this.counterMines = Counter({ title: 'Mines', className: 'counter-mines' });
    this.counterFlags = Counter({ title: 'Mines', className: 'counter-flags' });
    this.counterSteps = Counter({ title: 'Mines', className: 'counter-steps' });
    this.counterTime = Counter({ title: 'Mines', className: 'counter-time' });
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(StatisticsHtml);
    this.element.append(this.counterMines);
    this.element.append(this.counterFlags);
    this.element.append(this.counterSteps);
    this.element.append(this.counterTime);
  }

  getElement() {
    return this.element;
  }
}
