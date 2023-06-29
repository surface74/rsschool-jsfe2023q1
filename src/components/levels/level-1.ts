import './index.scss';
import html from './level-1.html';
import Level from './level';
import { CssClasses } from '../../enums/view/css-classes';
import HtmlHelper from '../../utils/html-helper';

export default class Level1 extends Level {
    protected element: DocumentFragment; // = document.createDocumentFragment();
    protected items: string[] = [];
    protected answers: string[] = [];
    protected readonly LEVEL_TITLE = 'Select the plates';

    constructor() {
        super();
        this.element = this.createHTMLElement(html);

        this.items = ['<plate />', '<plate />'];
        this.answers = ['plate'];
    }

    createHTMLElement(param: string): DocumentFragment {
        const element = HtmlHelper.ElementFromHTML(
            param
                .replace(/{{%HTML_CODE}}/g, CssClasses.HTML_CODE)
                .replace(/{{%PADDING_LEFT}}/g, CssClasses.PADDING_LEFT)
        );
        return element;
    }
}
