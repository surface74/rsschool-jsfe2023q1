import './index.scss';
import { EventName } from '../../../enums/events/event-names';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import { Attributes } from '../../../enums/view/attributes';
import Tooltip from '../../tooltip/index';

export default class HtmlViewerView extends DefaultView {
    private readonly HEADER_TITLE = 'HTML Viewer';
    private readonly HEADER_FILENAME = 'table.html';

    constructor() {
        super();
        this.configureHtml();
    }

    private selectHandler<T>(param: T) {
        const codeSelector = `.${CssClasses.CODE_SELECTABLE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const codes = document.querySelectorAll(codeSelector);
        codes.forEach((code) => code.classList.add(CssClasses.CODE_SELECTED));

        const selector = `.${CssClasses.TABLE_ITEM_SELECTABLE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const tableItem = document.querySelector(selector);
        if (tableItem instanceof HTMLElement) {
            tableItem.classList.add(CssClasses.TABLE_ITEM_SELECTED);
            const tooltip = new Tooltip(tableItem).getHtmlElement();
            tooltip.setAttribute(Attributes.DATA_ITEM_ID, String(param));
            document.body.append(tooltip);
        }
    }

    private unselectHandler<T>(param: T) {
        const codeSelector = `.${CssClasses.CODE_SELECTED}`;
        const codes = document.querySelectorAll(codeSelector);
        codes.forEach((code) => code.classList.remove(CssClasses.CODE_SELECTED));

        const selector = `.${CssClasses.TABLE_ITEM_SELECTABLE}[${Attributes.DATA_ITEM_ID}="${param}"]`;
        const tableItem = document.querySelector(selector);
        if (tableItem) {
            tableItem.classList.remove(CssClasses.TABLE_ITEM_SELECTED);
            const tooltip = document.querySelector(`.${CssClasses.TOOLTIP}[${Attributes.DATA_ITEM_ID}="${param}"]`);
            if (tooltip) {
                tooltip.remove();
            }
        }
    }

    public setEditorContent(content: DocumentFragment): void {
        const selector = `.${CssClasses.HTML_VIEWER} .${CssClasses.CODE_WRAPPER}`;
        const codeContainer: Element | null = document.querySelector(selector);
        if (codeContainer) {
            codeContainer.replaceChildren(content);
        }
        this.addEventListeners();
    }

    private addEventListeners() {
        const selector = `.${CssClasses.CODE_SELECTABLE}`;
        const codeLines = document.querySelectorAll(selector);
        codeLines.forEach((line) => {
            const lineId = line.getAttribute('data-item-id');
            line.addEventListener(EventName.POINTER_ENTER, this.selectHandler.bind(null, lineId));
            line.addEventListener(EventName.POINTER_LEAVE, this.unselectHandler.bind(null, lineId));
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

        const editor = document.createElement(TagNames.CODE_WRAPPER);
        editor.classList.add(CssClasses.CODE_WRAPPER);

        this.htmlElement.append(header, editor);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.HTML_VIEWER);
        return element;
    }
}
