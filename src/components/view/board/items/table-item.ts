export default abstract class TableItem {
    protected htmlElement: HTMLElement;

    constructor() {
        this.htmlElement = this.createHtml();
    }

    getHtmlElement() {
        return this.htmlElement;
    }

    protected abstract createHtml<T>(param?: T): HTMLElement;
}
