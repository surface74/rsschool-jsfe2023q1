import './style.css';
import { EventName } from '../../../../enums/events/event-names';
import DefaultView from '../../default-view';
import { CssClasses } from '../../../../enums/view/css-classes';
import { TagNames } from '../../../../enums/view/tag-names';
import Observer from '../../../observer/observer';

export default class TagItemView extends DefaultView {
    private currentTag = '0';

    constructor(observer: Observer | null) {
        super();

        observer?.subscribe(EventName.HTML_SELECTED, this.selectHandler.bind(this));
        observer?.subscribe(EventName.HTML_UNSELECTED, this.unselectHandler.bind(this));

        observer?.subscribe(EventName.LEVEL_SELECTED, this.selectHandler.bind(this));
        observer?.subscribe(EventName.LEVEL_UNSELECTED, this.unselectHandler.bind(this));

        this.htmlElement.addEventListener('mouseenter', () => observer?.notify(EventName.TAG_SELECTED));
        this.htmlElement.addEventListener('mouseout', () => observer?.notify(EventName.TAG_UNSELECTED));
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
    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.TABLE_ITEM);
        element.classList.add(CssClasses.TABLE_ITEM);
        return element;
    }
}
