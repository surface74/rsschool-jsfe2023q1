import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import { EventName } from '../../../enums/events/event-names';
import DefaultView from '../default-view';
import Observer from '../../observer/observer';
import { LevelItem } from '../../../types/level-item';
import { Attributes } from '../../../enums/view/attributes';

export default class LevelView extends DefaultView {
    private readonly HEADER_TITLE = 'LEVELS';
    private readonly HEADER_FILENAME = '';
    private readonly levels: LevelItem[];

    constructor(levels: LevelItem[]) {
        super();
        this.levels = levels;
        this.configureHtml();
        // this.htmlElement.addEventListener('mouseenter', () => observer?.notify(EventName.LEVEL_SELECTED, this.TEXT));
        // this.htmlElement.addEventListener('mouseout', () => observer?.notify(EventName.LEVEL_UNSELECTED, this.TEXT));
    }

    public fillLevelsList(): void {
        const levelList = document.createElement(TagNames.LEVEL_LIST);
        levelList.classList.add(CssClasses.LEVEL_VIEWER_LIST);
        levelList.addEventListener('click', this.selectLevel.bind(this));

        this.levels.forEach((item) => {
            const listItem = document.createElement(TagNames.LEVEL_LIST_ITEM);
            listItem.setAttribute(Attributes.DATA_LEVEL_ID, String(item.id));
            listItem.classList.add(CssClasses.LEVEL_VIEWER_LIST_ITEM);

            if (item.helpUsed) {
                listItem.classList.add(CssClasses.LEVEL_DONE_WITH_HELP);
            } else if (item.done) {
                listItem.classList.add(CssClasses.LEVEL_DONE);
            }

            listItem.textContent = `Level ${item.id}`;
            levelList.append(listItem);
        });

        const selector = `.${CssClasses.LEVEL_VIEWER} .${CssClasses.LEVEL_VIEWER_CONTENT}`;
        const editor: Element | null = document.querySelector(selector);
        if (editor) {
            editor.replaceChildren(levelList);
        }
    }

    selectLevel(e: MouseEvent): void {
        if (e.target instanceof HTMLElement) {
            if (e.target.classList.contains(CssClasses.LEVEL_VIEWER_LIST_ITEM)) {
                const levelSelectedEvent = new CustomEvent(String(EventName.LEVEL_SELECTED), {
                    bubbles: true,
                    detail: e.target.getAttribute(Attributes.DATA_LEVEL_ID),
                });
                this.htmlElement.dispatchEvent(levelSelectedEvent);
            }
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
