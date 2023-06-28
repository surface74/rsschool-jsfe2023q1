import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import Pickle from './items/pickle';
import Orange from './items/orange';
import Plate from './items/plate';
import Bento from './items/bento';
import Table from './items/table';

export default class BoardView extends DefaultView {
    constructor() {
        super();
        this.configureHtml();
    }

    public setLevelOrder(order: string) {
        const levelOrder: Element | null = document.querySelector(`.${CssClasses.BOARD_LEVEL_ORDER}`);
        if (levelOrder) {
            levelOrder.textContent = order;
        }
    }

    public fillTable() {
        const board = document.querySelector(`.${CssClasses.BOARD_ITEM_CONTAINER}`);
        if (board) {
            const pickle = new Pickle();
            const orange = new Orange();
            const plate = new Plate();
            const bento = new Bento();
            board.replaceChildren(
                plate.getHtmlElement(),
                pickle.getHtmlElement(),
                bento.getHtmlElement(),
                orange.getHtmlElement()
            );
        }
    }

    private configureHtml() {
        const levelOrder = document.createElement(TagNames.BOARD_LEVEL_ORDER);
        levelOrder.classList.add(CssClasses.BOARD_LEVEL_ORDER);

        const table = new Table().getHtmlElement();
        // table.classList.add(CssClasses.BOARD_TABLE);

        const itemsContainer = document.createElement(TagNames.DIV);
        itemsContainer.classList.add(CssClasses.BOARD_ITEM_CONTAINER);
        table.append(itemsContainer);

        this.htmlElement.append(levelOrder, table);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.BOARD);

        return element;
    }
}
