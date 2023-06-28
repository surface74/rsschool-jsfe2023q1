export default abstract class Level {
    protected readonly LEVEL_TITLE: string = '';
    protected element: DocumentFragment = document.createDocumentFragment();
    protected items: string[] = [];
    protected answers: string[] = [];

    // constructor() {
    //     this.element = this.createHTMLElement(html);
    // }

    public getHtmlElement() {
        return this.element;
    }

    public getLevelTitle() {
        return this.LEVEL_TITLE;
    }

    public getAnswer() {
        return this.answers;
    }
    protected abstract createHTMLElement(param: string): DocumentFragment;
}
