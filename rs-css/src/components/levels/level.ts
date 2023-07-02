export default abstract class Level {
    protected readonly LEVEL_TITLE: string = '';
    protected readonly ANSWERS: string[] = [];
    protected viewElement: DocumentFragment = document.createDocumentFragment();
    protected helpElement: DocumentFragment = document.createDocumentFragment();

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
        return this.ANSWERS;
    }

    protected abstract createHTMLElement(param: string): DocumentFragment;
}
