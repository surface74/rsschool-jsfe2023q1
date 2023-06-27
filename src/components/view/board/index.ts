import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import TagItemView from './tag-item/tag-item-view';
import Observer from '../../observer/observer';

export default class BoardView extends DefaultView {
    constructor(observer: Observer) {
        super();
        this.configureHtml();
    }

    public setLevelOrder(order: string) {
        const levelOrder: Element | null = document.querySelector(`.${CssClasses.BOARD_LEVEL_ORDER}`);
        if (levelOrder) {
            levelOrder.textContent = order;
        }
    }

    private configureHtml() {
        const levelOrder = document.createElement(TagNames.BOARD_LEVEL_ORDER);
        levelOrder.classList.add(CssClasses.BOARD_LEVEL_ORDER);

        const itemsContainer = document.createElement(TagNames.DIV);
        itemsContainer.classList.add(CssClasses.BOARD_ITEM_CONTAINER);

        this.htmlElement.append(levelOrder, itemsContainer);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.BOARD);

        // let observer: Observer | null = null;
        // if (param instanceof Observer) {
        //     observer = param;
        // }
        // let tagItemItem = new TagItemView(observer);
        // element.append(tagItemItem.getHtmlElement());
        // tagItemItem = new TagItemView(observer);
        // element.append(tagItemItem.getHtmlElement());
        // tagItemItem = new TagItemView(observer);
        // element.append(tagItemItem.getHtmlElement());

        return element;
    }
}
