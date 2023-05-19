import './index.scss';
import soundHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const Sound = ({ onClick = null, className = null }) => {
  const element = HtmlHelper.ElementFromHTML(soundHtml);
  if (onClick) {
    element.addEventListener('click', onClick);
  }
  if (className) {
    className.split(' ').forEach((c) => element.classList.add(c));
  }

  return element;
};

export default Sound;
