import './index.scss';
import StatisticsHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Counter from '../Counter/index.js';
import Timer from '../Timer/index.js';

export default class Statistics {
  constructor() {
    this.counterMines = new Counter({ title: 'Mines', className: 'counter-mines' });
    this.counterFlags = new Counter({ title: 'Flags', className: 'counter-flags' });
    this.counterSteps = new Counter({ title: 'Steps', className: 'counter-steps' });
    this.counterTime = new Timer();
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(StatisticsHtml);
    this.element.append(this.counterMines.getElement());
    this.element.append(this.counterFlags.getElement());
    this.element.append(this.counterSteps.getElement());
    this.element.append(this.counterTime.getElement());
  }

  getElement() {
    return this.element;
  }
}
