import './index.scss';
import { EventName } from '../../../enums/events/event-names';
import { Attributes } from '../../../enums/view/attributes';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import Tooltip from '../../tooltip/index';

export default class BoardView extends DefaultView {
    constructor() {
        super();
        this.configHtml();
    }

    private selectHandler(param: string) {
        const codeSelector = `.${CssClasses.CODE_SELECTABLE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const codes = document.querySelectorAll(codeSelector);
        codes.forEach((code) => code.classList.add(CssClasses.CODE_SELECTED));

        const selector = `.${CssClasses.TABLE_ITEM_SELECTABLE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const tableItem = document.querySelector(selector);
        if (tableItem instanceof HTMLElement) {
            tableItem.classList.add(CssClasses.TABLE_ITEM_SELECTED);
            const tooltip = new Tooltip(tableItem).getHtmlElement();
            tooltip.setAttribute(Attributes.DATA_ITEM_ID, param);
            document.body.append(tooltip);
        }
    }

    private unselectHandler<T>(param: T) {
        const codeSelector = `.${CssClasses.CODE_SELECTED}`;
        const codes = document.querySelectorAll(codeSelector);
        codes.forEach((code) => code.classList.remove(CssClasses.CODE_SELECTED));

        const selector = `.${CssClasses.TABLE_ITEM_SELECTABLE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const tableItem = document.querySelector(selector);
        if (tableItem) {
            tableItem.classList.remove(CssClasses.TABLE_ITEM_SELECTED);
            const tooltip = document.querySelector(`.${CssClasses.TOOLTIP}[${Attributes.DATA_ITEM_ID}="${param}"]`);
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
        }
        this.addEventListeners();
    }

    private addEventListeners() {
        const selector = `.${CssClasses.TABLE_ITEM_SELECTABLE}`;
        const items = document.querySelectorAll(selector);
        items.forEach((item) => {
            const lineId = item.getAttribute('data-item-id');
            item.addEventListener(EventName.POINTER_ENTER, this.selectHandler.bind(null, String(lineId)));
            item.addEventListener(EventName.POINTER_LEAVE, this.unselectHandler.bind(null, String(lineId)));
        });
    }

    private configHtml() {
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
