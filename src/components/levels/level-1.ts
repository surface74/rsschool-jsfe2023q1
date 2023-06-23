import './index.scss';
import Level from './level';
import { CssClasses } from '../../enums/view/css-classes';
import { TagNames } from '../../enums/view/tag-names';
import { AttributeNames } from '../../enums/view/attributes-names';

export default class Level1 extends Level {
    constructor() {
        super();

        this.items = ['<plate />', '<plate />'];
        this.element = this.createHTMLElenemt();
        this.answers = ['plate'];
    }

    createHTMLElenemt(): HTMLElement {
        const element = document.createElement(TagNames.DIV);
        element.classList.add(CssClasses.HTML_CODE);
        element.append(document.createTextNode('<div class="table">'));
        this.items.forEach((item, index) => {
            const itemElement = document.createElement(TagNames.DIV);
            itemElement.classList.add(CssClasses.PADDING_LEFT);
            itemElement.setAttributeNode(document.createAttribute(AttributeNames.ITEM_ID));
            itemElement.setAttribute(AttributeNames.ITEM_ID, String(index));
            itemElement.append(document.createTextNode(item));
            element.append(itemElement);
        });
        element.append(document.createTextNode('</div>'));
        return element;
    }
}
