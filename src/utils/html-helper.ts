export default class HtmlHelper {
    static ElementFromHTML(htmlString: string): HTMLElement {
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = htmlString;
        const element: Node = template.content.cloneNode();
        if (element instanceof HTMLElement) {
            return element;
        }
        return document.createElement('div');
    }
}
