import './index.scss';
import { CssClasses } from '../../enums/view/css-classes';
import { TagNames } from '../../enums/view/tag-names';
import { Attributes } from '../../enums/view/attributes';

export default class Tooltip {
    element: HTMLElement;
    constructor(htmlElement: HTMLElement) {
        this.element = this.createElement(htmlElement);
    }

    getHtmlElement(): HTMLElement {
        return this.element;
    }

    private createElement(htmlElement: HTMLElement): HTMLElement {
        const element = document.createElement(TagNames.TOOLTIP);
        element.textContent = htmlElement.getAttribute(Attributes.DATA_ITEM_TOOLTIP) || '';

        const clientRect = htmlElement.getBoundingClientRect();
        element.style.top = `${clientRect.top - 40}px`;
        element.style.left = `${(clientRect.left + clientRect.right) / 2}px`;
        element.classList.add(CssClasses.TOOLTIP);

        return element;
    }
}
