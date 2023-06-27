import { TagNames } from '../enums/view/tag-names';

type Attributes = {
    [key: string]: string;
};

type CreateElementParameter = {
    tag: TagNames;
    text: string;
    attr: Attributes;
};

export default class HtmlHelper {
    static ElementFromHTML(htmlString: string): DocumentFragment {
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = htmlString;
        const element: DocumentFragment = template.content;

        return element;
    }

    static CreateElement(tag: TagNames, text?: string, attr?: Attributes): HTMLElement {
        const elem: HTMLElement = document.createElement(tag);
        if (text !== undefined) {
            elem.textContent = text;
        }
        if (attr !== undefined) {
            const entries: [key: string, value: string][] = Array.from(Object.entries(attr));
            for (let i = 0; i < entries.length; i += 1) {
                const [key, value] = entries[i];
                elem.setAttributeNode(document.createAttribute(key));
                elem.setAttribute(key, value);
            }
        }
        return elem;
    }
}
