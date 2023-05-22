import './index.scss';
import HeaderHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';
import Button from '../Button/index.js';
import NewGame from '../NewGame/index.js';

export default class Header {
  constructor() {
    this.element = HtmlHelper.ElementFromHTML(HeaderHtml);
    this.buttonNewGame = Button({
      onClick: this.showNewGamePopup.bind(this),
      title: 'New game',
      className: 'button-start',
    });
    this.buttonRestore = Button({ title: 'Restore', className: 'button_disabled button-restore' });
    this.buttonSave = Button({ title: 'Save', className: 'button-save' });
    this.buttonResults = Button({ title: 'Top 10', className: 'button-results' });
    this.newGame = new NewGame();
    this.init();
  }

  init() {
    this.element.append(this.buttonNewGame);
    this.element.append(this.buttonRestore);
    this.element.append(this.buttonSave);
    this.element.append(this.buttonResults);
  }

  getElement() {
    return this.element;
  }

  showNewGamePopup() {
    document.body.append(this.newGame.getElement());
  }
}
