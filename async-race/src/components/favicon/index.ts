import html from './index.html';
import HtmlCreator from '../../utils/html-creator';

export default class Favicon {
    element: DocumentFragment;

    constructor() {
        this.element = this.createElement(html);
    }

    getHtmlElement(): DocumentFragment {
        return this.element;
    }

    private createElement(param: string): DocumentFragment {
        return HtmlCreator.ElementFromHTML(param);
    }
}
