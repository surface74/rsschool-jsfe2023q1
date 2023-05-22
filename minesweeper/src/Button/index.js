import './index.scss';
import ButtonHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const Button = ({ onClick = null, title, className = null }) => {
  const element = HtmlHelper.ElementFromHTML(ButtonHtml);
  if (onClick) {
    element.addEventListener('click', onClick);
  }
  element.innerHTML = title || '';
  if (className) {
    className.split(' ').forEach((c) => element.classList.add(c));
  }

  return element;
};

export default Button;
