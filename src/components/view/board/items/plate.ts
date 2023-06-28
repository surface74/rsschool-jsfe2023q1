import './index.scss';
import { CssClasses } from '../../../../enums/view/css-classes';
import { TagNames } from '../../../../enums/view/tag-names';
import { Attributes } from '../../../../enums/view/attributes';
import TableItem from './table-item';

export default class Plate extends TableItem {
    BASE_PATH = '../../../../assets/images/';
    IMAGE_PATH = 'plate.png';

    constructor() {
        super();
        this.configureHtml();
    }

    private configureHtml() {
        const image = document.createElement(TagNames.IMAGE);
        image.classList.add(CssClasses.TABLE_ITEM_PLATE);
        image.setAttribute(Attributes.SRC, `${this.BASE_PATH}${this.IMAGE_PATH}`);

        this.htmlElement.append(image);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.TABLE_ITEM);
        element.classList.add(CssClasses.TABLE_ITEM);

        return element;
    }
}
