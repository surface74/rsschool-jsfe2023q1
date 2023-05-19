import './index.scss';
import CounterHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const Counter = ({ title, className = null }) => {
  const element = HtmlHelper.ElementFromHTML(CounterHtml);

  element.querySelector('.counter__title').innerHTML = title;
  if (className) {
    className.split(' ').forEach((c) => element.classList.add(c));
  }

  return element;
};

export default Counter;
