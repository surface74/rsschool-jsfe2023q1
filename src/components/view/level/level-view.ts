import './style.css';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import { EventName } from '../../../enums/events/event-names';
import DefaultView from '../default-view';
import Observer from '../../observer/observer';
import Level from '../../levels/level-1';

export default class LevelView extends DefaultView {
    private readonly TEXT = 'LevelView';

    constructor(observer: Observer) {
        super();

        this.htmlElement.addEventListener('mouseenter', () => observer?.notify(EventName.LEVEL_SELECTED, this.TEXT));
        this.htmlElement.addEventListener('mouseout', () => observer?.notify(EventName.LEVEL_UNSELECTED, this.TEXT));
    }
    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.LEVEL);
        element.textContent = 'LevelView';

        return element;
    }
}
