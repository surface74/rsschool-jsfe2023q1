export default abstract class Level {
    protected readonly LEVEL_TITLE: string = '';
    protected viewElement: DocumentFragment = document.createDocumentFragment();
    protected helpElement: DocumentFragment = document.createDocumentFragment();
    protected answers: string[] = [];

    // constructor() {
    //     this.element = this.createHTMLElement(html);
    // }

    public getHelpElement() {
        return this.helpElement;
    }

    public getViewElement() {
        return this.viewElement;
    }

    public getLevelTitle() {
        return this.LEVEL_TITLE;
    }

    public getAnswer() {
        return this.answers;
    }

    protected abstract createHelpElement(param: string): DocumentFragment;
    protected abstract createViewElement(param: string): DocumentFragment;
    // protected abstract createHTMLElement(param: string): DocumentFragment;
}
