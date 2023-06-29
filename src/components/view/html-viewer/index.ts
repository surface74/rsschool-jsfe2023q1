import './index.scss';
import { EventName } from '../../../enums/events/event-names';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import Observer from '../../observer/observer';

export default class HtmlViewerView extends DefaultView {
    private readonly HEADER_TITLE = 'HTML Viewer';
    private readonly HEADER_FILENAME = 'table.html';

    constructor(observer: Observer | null) {
        super();
        this.configureHtml();

        // observer?.subscribe(EventName.TAG_SELECTED, this.selectHandler.bind(this));
        // observer?.subscribe(EventName.TAG_UNSELECTED, this.unselectHandler.bind(this));

        // observer?.subscribe(EventName.LEVEL_SELECTED, this.selectHandler.bind(this));
        // observer?.subscribe(EventName.LEVEL_UNSELECTED, this.unselectHandler.bind(this));

        // this.htmlElement.addEventListener('mouseenter', () => observer?.notify(EventName.HTML_SELECTED));
        // this.htmlElement.addEventListener('mouseout', () => observer?.notify(EventName.HTML_UNSELECTED));
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

    public setEditorContent(content: DocumentFragment): void {
        const selector = `.${CssClasses.HTML_VIEWER} .${CssClasses.EDITOR_VIEWER}`;
        const editor: Element | null = document.querySelector(selector);
        if (editor) {
            editor.replaceChildren(content);
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

        const editor = document.createElement(TagNames.EDITOR_VIEWER);
        editor.classList.add(CssClasses.EDITOR_VIEWER);

        this.htmlElement.append(header, editor);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.HTML_VIEWER);
        return element;
    }
}
