import '../index.scss';
import html from './level-1.html';
import viewHtml from './view.html';
import helpHtml from './help.html';
import Level from '../level';
import { CssClasses } from '../../../enums/view/css-classes';
import HtmlHelper from '../../../utils/html-helper';
import { Attributes } from '../../../enums/view/attributes';

export default class Level1 extends Level {
    protected readonly LEVEL_TITLE = 'Select the plates';

    constructor() {
        super();
        this.helpElement = this.createHelpElement(helpHtml);
        this.viewElement = this.createViewElement(viewHtml);

        this.answers = ['plate'];
    }

    createHelpElement(param: string): DocumentFragment {
        const element = HtmlHelper.ElementFromHTML(
            param
                .replace(/{{%HTML_CODE}}/g, CssClasses.HTML_CODE)
                .replace(/{{%PADDING_LEFT}}/g, CssClasses.PADDING_LEFT)
                .replace(/{{%DATA_ITEM_ID}}/g, Attributes.DATA_ITEM_ID)
        );
        return element;
    }

    createViewElement(param: string): DocumentFragment {
        const element = HtmlHelper.ElementFromHTML(
            param
                .replace(/{{%HTML_CODE}}/g, CssClasses.HTML_CODE)
                .replace(/{{%PADDING_LEFT}}/g, CssClasses.PADDING_LEFT)
        );
        return element;
    }
}
