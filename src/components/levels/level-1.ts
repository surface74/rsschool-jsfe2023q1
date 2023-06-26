import './index.scss';
import html from './level-1.html';
import Level from './level';
import { CssClasses } from '../../enums/view/css-classes';
import { TagNames } from '../../enums/view/tag-names';
import { AttributeNames } from '../../enums/view/attributes-names';
import HtmlHelper from '../../utils/html-helper';

export default class Level1 extends Level {
    LEVEL_TITLE = 'Level 1';

    constructor() {
        super();
        this.createHTMLElement(html);

        this.items = ['<plate />', '<plate />'];
        this.element = this.createHTMLElement(html);
        this.answers = ['plate'];
    }

    createHTMLElement(param: string) {
        const element = HtmlHelper.ElementFromHTML(
            param
                .replace(/{{%HTML_CODE}}/g, CssClasses.HTML_CODE)
                .replace(/{{%PADDING_LEFT}}/g, CssClasses.PADDING_LEFT)
        );
        return element;
    }
}
