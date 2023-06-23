export default abstract class Level {
    protected element: HTMLElement;
    protected items: string[] = [];
    protected answers: string[] = [];

    constructor() {
        this.element = this.createHTMLElenemt();
    }

    getHtmlElement() {
        return this.element;
    }

    protected abstract createHTMLElenemt<T>(param?: T): HTMLElement;
}
