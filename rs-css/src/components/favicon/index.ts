import html from './index.html';
import HtmlHelper from '../../utils/html-helper';

export default class Favicon {
    element: DocumentFragment;

    constructor() {
        this.element = this.createHTMLElement(html);
    }

    getHtmlElement(): DocumentFragment {
        return this.element;
    }

    createHTMLElement(param: string): DocumentFragment {
        return HtmlHelper.ElementFromHTML(param);
    }
}
