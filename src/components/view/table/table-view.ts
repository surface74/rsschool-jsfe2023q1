import './style.css';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import TagItemView from './tag-item/tag-item-view';
import Observer from '../../observer/observer';

export default class TableView extends DefaultView {
    constructor(observer: Observer) {
        super();
        this.htmlElement = this.createHtml(observer);
    }

    protected createHtml<T>(param: T): HTMLElement {
        let observer: Observer | null = null;
        if (param instanceof Observer) {
            observer = param;
        }
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.TABLE);

        let tagItemItem = new TagItemView(observer);
        element.append(tagItemItem.getHtmlElement());
        tagItemItem = new TagItemView(observer);
        element.append(tagItemItem.getHtmlElement());
        tagItemItem = new TagItemView(observer);
        element.append(tagItemItem.getHtmlElement());

        return element;
    }
}
