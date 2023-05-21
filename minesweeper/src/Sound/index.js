import './index.scss';
import SoundHtml from './index.html';
import HtmlHelper from '../utils/html-helper.js';

export default class Sound {
  constructor() {
    this.audioStep = new Audio('./assets/audio/step.mp3');
    this.audioWin = new Audio('./assets/audio/win.mp3');
    this.audioLose = new Audio('./assets/audio/lose.mp3');
    this.audioFlag = new Audio('./assets/audio/flag.mp3');
    this.init();
  }

  init() {
    this.element = HtmlHelper.ElementFromHTML(SoundHtml);
    const checkbox = this.element.querySelector('.sound__switch');
    this.soundOn = checkbox.checked;
    checkbox.addEventListener('change', this.onChange.bind(this));
  }

  onChange(e) {
    this.soundOn = e.target.checked;
  }

  getElement() {
    return this.element;
  }
}
