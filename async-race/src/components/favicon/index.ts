import html from './index.html';
import HtmlHelper from '../../utils/html-helper';

export default class Favicon {
    element: DocumentFragment;

    constructor() {
        this.element = this.createElement(html);
    }

    getHtmlElement(): DocumentFragment {
        return this.element;
    }

    private createElement(param: string): DocumentFragment {
        return HtmlHelper.ElementFromHTML(param);
    }
}
