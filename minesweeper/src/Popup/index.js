import './index.scss';
import PopupHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

const Popup = ({ htmlElement, className = null }) => {
  const popupElement = HtmlHelper.ElementFromHTML(PopupHtml);

  popupElement.addEventListener('wheel', (e) => e.preventDefault());
  popupElement.addEventListener('click', (e) => {
    if (e.target === popupElement) {
      popupElement.classList.add('popup_hidden');
    }
  });

  if (htmlElement instanceof HTMLElement) {
    popupElement.append(htmlElement);
  }

  if (className) {
    className.split(' ').forEach((c) => popupElement.classList.add(c));
  }

  return popupElement;
};

export default Popup;
