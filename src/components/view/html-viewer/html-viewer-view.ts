import './style.css';
import { EventName } from '../../../enums/events/event-names';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import Observer from '../../observer/observer';

export default class HtmlViewerView extends DefaultView {
    private readonly HEADER_TEXT = 'HtmlViewerView';

    constructor(observer: Observer | null) {
        super();
        this.configureHtml();

        observer?.subscribe(EventName.TAG_SELECTED, this.selectHandler.bind(this));
        observer?.subscribe(EventName.TAG_UNSELECTED, this.unselectHandler.bind(this));

        observer?.subscribe(EventName.LEVEL_SELECTED, this.selectHandler.bind(this));
        observer?.subscribe(EventName.LEVEL_UNSELECTED, this.unselectHandler.bind(this));

        this.htmlElement.addEventListener('mouseenter', () => observer?.notify(EventName.HTML_SELECTED));
        this.htmlElement.addEventListener('mouseout', () => observer?.notify(EventName.HTML_UNSELECTED));
    }

    private selectHandler<T>(param: T) {
        this.htmlElement.classList.add(CssClasses.SELECTED);
        if (typeof param === 'string') {
            this.htmlElement.textContent = param;
        }
    }
    private unselectHandler() {
        this.htmlElement.classList.remove(CssClasses.SELECTED);
        this.htmlElement.textContent = '';
    }
    private configureHtml() {
        const label = document.createElement(TagNames.SECTION_HEADER);
        label.textContent = this.HEADER_TEXT;

        this.htmlElement.append(label);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.HTML_VIEWER);

        return element;
    }
}
