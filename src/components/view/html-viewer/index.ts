import './index.scss';
import { EventName } from '../../../enums/events/event-names';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import Mediator from '../../mediator/mediator';

export default class HtmlViewerView extends DefaultView {
    private readonly HEADER_TITLE = 'HTML Viewer';
    private readonly HEADER_FILENAME = 'table.html';
    private mediator = Mediator.getInstance();

    constructor() {
        super();
        this.configureHtml();
    }

    private selectHandler<T>(param: T) {
        if (this instanceof HTMLElement) {
            this.classList.add(CssClasses.CODE_SELECTED);
        }
    }

    private unselectHandler<T>(param: T) {
        if (this instanceof HTMLElement) {
            this.classList.remove(CssClasses.CODE_SELECTED);
        }
    }

    public setEditorContent(content: DocumentFragment): void {
        const selector = `.${CssClasses.HTML_VIEWER} .${CssClasses.EDITOR_VIEWER}`;
        const editor: Element | null = document.querySelector(selector);
        if (editor) {
            editor.replaceChildren(content);
        }
        this.addEventListeners();
    }

    private addEventListeners() {
        const selector = `.${CssClasses.SELECTABLE_CODE}`;
        const codeLines = document.querySelectorAll(selector);
        codeLines.forEach((line) => {
            const lineId = line.getAttribute('data-item-id');
            line.addEventListener(EventName.POINTER_ENTER, this.selectHandler.bind(line, lineId));
            line.addEventListener(EventName.POINTER_LEAVE, this.unselectHandler.bind(line, lineId));
        });
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
