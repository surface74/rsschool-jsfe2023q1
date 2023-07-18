import HtmlCreator, { ElementParams } from '../../utils/html-creator';

export type ViewParams = {
    tag: TagName;
    classNames: Array<string>;
};

export default class DefaultView {
    private element: HTMLElement;
    protected htmlCreator: HtmlCreator;

    constructor(params: ViewParams) {
        this.htmlCreator = this.createView(params);
        this.element = this.htmlCreator.getElement();
    }

    public getElement() {
        return this.element;
    }

    createView(params: ViewParams): HtmlCreator {
        const elementParams: ElementParams = {
            tag: params.tag,
            classNames: params.classNames,
        };
        return new HtmlCreator(elementParams);
    }

    abstract configView();
}
