import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import { EventName } from '../../../enums/events/event-names';
import DefaultView from '../default-view';
import Observer from '../../observer/observer';
import { LevelItem } from '../../../types/level-item';

export default class LevelView extends DefaultView {
    private readonly HEADER_TITLE = 'LEVELS';
    private readonly HEADER_FILENAME = '';
    private readonly levels: LevelItem[];

    constructor(observer: Observer, levels: LevelItem[]) {
        super();
        this.levels = levels;
        this.configureHtml();
        // this.htmlElement.addEventListener('mouseenter', () => observer?.notify(EventName.LEVEL_SELECTED, this.TEXT));
        // this.htmlElement.addEventListener('mouseout', () => observer?.notify(EventName.LEVEL_UNSELECTED, this.TEXT));
    }

    public fillLevelsList(): void {
        const levelList = document.createElement(TagNames.LEVEL_LIST);
        levelList.classList.add(CssClasses.LEVEL_LIST);
        this.levels.forEach((item) => {
            const listItem = document.createElement(TagNames.LEVEL_LIST_ITEM);
            listItem.classList.add(CssClasses.LEVEL_LIST_ITEM);
            if (item.done) {
                listItem.classList.add(CssClasses.LEVEL_LIST_ITEM_DONE);
            }
            listItem.textContent = item.level.getLevelTitle();
            levelList.append(listItem);
        });

        const selector = `.${CssClasses.LEVEL_VIEWER} .${CssClasses.LEVEL_VIEWER_CONTENT}`;
        const editor: Element | null = document.querySelector(selector);
        console.log('editor: ', editor);
        if (editor) {
            editor.replaceChildren(levelList);
        }
    }

    private configureHtml() {
        const header = document.createElement(TagNames.SECTION_HEADER);
        header.classList.add(CssClasses.SECTION_HEADER);

        const headerTitle = document.createElement(TagNames.SECTION_TITLE);
        headerTitle.textContent = this.HEADER_TITLE;

        const headerFilename = document.createElement(TagNames.SECTION_TITLE);

        headerFilename.textContent = this.HEADER_FILENAME;
        header.append(headerTitle, headerFilename);

        const editor = document.createElement(TagNames.LEVEL_VIEWER);
        editor.classList.add(CssClasses.LEVEL_VIEWER_CONTENT);

        this.htmlElement.append(header, editor);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.LEVEL_VIEWER);

        return element;
    }
}
