import './index.scss';
import ButtonHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const Button = ({ onClick = null, title, className = null }) => {
  const buttonElement = HtmlHelper.ElementFromHTML(ButtonHtml);
  if (onClick) {
    buttonElement.addEventListener('click', onClick);
  }
  buttonElement.innerHTML = title;
  if (className) {
    className.split(' ').forEach((c) => buttonElement.classList.add(c));
  }

  return buttonElement;
};

export default Button;
