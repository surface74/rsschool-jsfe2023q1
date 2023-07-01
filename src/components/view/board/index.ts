import './index.scss';
import { EventName } from '../../../enums/events/event-names';
import { Attributes } from '../../../enums/view/attributes';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import Mediator from '../../mediator/mediator';
import Tooltip from '../../tooltip/index';

export default class BoardView extends DefaultView {
    constructor() {
        super();
        this.configureHtml();
    }

    private selectHandler<T>(param: T) {
        if (this instanceof HTMLElement) {
            this.classList.add(CssClasses.TABLE_ITEM_SELECTED);
            const selector = `.${CssClasses.SELECTABLE_CODE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
            const codeLine = document.querySelector(selector);
            if (codeLine instanceof HTMLElement) {
                codeLine.classList.add(CssClasses.CODE_SELECTED);
                const tooltip = new Tooltip(this);
                document.body.append(tooltip.getHtmlElement());
            }
        }
    }

    private unselectHandler<T>(param: T) {
        if (this instanceof HTMLElement) {
            this.classList.remove(CssClasses.TABLE_ITEM_SELECTED);
        }
        const selector = `.${CssClasses.SELECTABLE_CODE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const tableItem = document.querySelector(selector);
        if (tableItem) {
            tableItem.classList.remove(CssClasses.CODE_SELECTED);
            const tooltip = document.querySelector(`.${CssClasses.TOOLTIP}`);
            if (tooltip) {
                tooltip.remove();
            }
        }
    }

    public setLevelOrder(order: string) {
        const levelOrder: Element | null = document.querySelector(`.${CssClasses.BOARD_LEVEL_ORDER}`);
        if (levelOrder) {
            levelOrder.textContent = order;
        }
    }

    public hideActiveElement() {
        const selector = `.${CssClasses.TABLE_ITEM_ACTIVE}`;
        const activeItems = this.htmlElement.querySelectorAll(selector);
        activeItems.forEach((item) => {
            item.classList.remove(CssClasses.TABLE_ITEM_ACTIVE);
            item.classList.add(CssClasses.TABLE_ITEM_GO_AWAY);
        });
    }

    public fillTable(element: DocumentFragment) {
        const board = document.querySelector(`.${CssClasses.BOARD_ITEM_CONTAINER}`);
        if (board) {
            board.replaceChildren(element);
            // const pickle = new Pickle();
            // const orange = new Orange();
            // const plate = new Plate();
            // const bento = new Bento();
            // board.replaceChildren(
            //     plate.getHtmlElement(),
            //     pickle.getHtmlElement(),
            //     bento.getHtmlElement(),
            //     orange.getHtmlElement()
            // );
        }
        this.addEventListeners();
    }

    private addEventListeners() {
        const selector = `.${CssClasses.TABLE_ITEM_SELECTABLE}`;
        const items = document.querySelectorAll(selector);
        items.forEach((item) => {
            const lineId = item.getAttribute('data-item-id');
            item.addEventListener(EventName.POINTER_ENTER, this.selectHandler.bind(item, lineId));
            item.addEventListener(EventName.POINTER_LEAVE, this.unselectHandler.bind(item, lineId));
        });
    }

    private configureHtml() {
        const wrapper = document.createElement(TagNames.DIV);
        wrapper.classList.add(CssClasses.BOARD_WRAPPER);

        const levelOrder = document.createElement(TagNames.BOARD_LEVEL_ORDER);
        levelOrder.classList.add(CssClasses.BOARD_LEVEL_ORDER);

        const itemsContainer = document.createElement(TagNames.DIV);
        itemsContainer.classList.add(CssClasses.BOARD_ITEM_CONTAINER);

        wrapper.append(levelOrder, itemsContainer);
        this.htmlElement.append(wrapper);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.BOARD);

        return element;
    }
}
