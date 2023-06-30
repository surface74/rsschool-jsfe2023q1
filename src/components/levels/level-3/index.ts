import '../index.scss';
import '../../view/board/items/index.scss';
import viewHtml from './view.html';
import helpHtml from './help.html';
import Level from '../level';
import HtmlHelper from '../../../utils/html-helper';
import Replacer from '../../../utils/replacer';

export default class Level3 extends Level {
    protected readonly LEVEL_TITLE = 'Select the plates';
    protected readonly ANSWERS = ['plate'];

    constructor() {
        super();
        this.helpElement = this.createHTMLElement(helpHtml);
        this.viewElement = this.createHTMLElement(viewHtml);
    }

    createHTMLElement(param: string): DocumentFragment {
        const html = new Replacer(param).getText();
        const element = HtmlHelper.ElementFromHTML(html);
        return element;
    }
}
