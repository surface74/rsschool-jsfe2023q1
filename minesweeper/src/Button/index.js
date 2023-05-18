import './index.scss';
import ButtonHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const Button = ({ onClick, title, className }) => {
  const buttonElement = HtmlHelper.ElementFromHTML(ButtonHtml);
  buttonElement.addEventListener('click', onClick);
  buttonElement.innerHTML = title;
  buttonElement.classList.add(className);

  return buttonElement;
};

export default Button;
