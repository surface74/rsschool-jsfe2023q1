import './index.scss';
import htmlHelp from './help.html';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import { Attributes } from '../../../enums/view/attributes';
import DefaultView from '../default-view';
import HtmlHelper from '../../../utils/html-helper';

export default class CssViewerView extends DefaultView {
    private readonly HEADER_TITLE = 'CSS Viewer';
    private readonly HEADER_FILENAME = 'style.css';
    private readonly BUTTON_ENTER_CAPTION = 'Enter';
    private readonly BUTTON_HELP_CAPTION = 'Help';
    private readonly INPUT_PLACEHOLDER = 'Type in CSS selector';

    constructor() {
        super();
        this.configureHtml();
    }

    private configureHtml() {
        this.addHeader();
        this.addControls();
        this.addHelpBlock();
    }

    private addControls() {
        const controlBlock = document.createElement(TagNames.CSS_VIEWER_CONTROLS);
        controlBlock.classList.add(CssClasses.CSS_VIEWER_CONTROLS);

        const input = document.createElement(TagNames.INPUT);
        input.setAttribute(Attributes.PLACEHOLDER, this.INPUT_PLACEHOLDER);
        input.classList.add(CssClasses.CSS_VIEWER_INPUT);

        const enterButton = document.createElement(TagNames.BUTTON);
        enterButton.setAttribute(Attributes.TYPE, Attributes.BUTTON);
        enterButton.classList.add(CssClasses.CSS_VIEWER_BUTTON, CssClasses.CSS_VIEWER_BUTTON_ENTER);
        enterButton.textContent = this.BUTTON_ENTER_CAPTION;

        const helpButton = document.createElement(TagNames.BUTTON);
        helpButton.setAttribute(Attributes.TYPE, Attributes.BUTTON);
        helpButton.classList.add(CssClasses.CSS_VIEWER_BUTTON);
        helpButton.textContent = this.BUTTON_HELP_CAPTION;

        controlBlock.append(input, enterButton, helpButton);
        this.htmlElement.append(controlBlock);
    }

    private addHeader(): void {
        const header = document.createElement(TagNames.SECTION_HEADER);
        header.classList.add(CssClasses.SECTION_HEADER);

        const headerTitle = document.createElement(TagNames.SECTION_TITLE);
        headerTitle.textContent = this.HEADER_TITLE;

        const headerFilename = document.createElement(TagNames.SECTION_TITLE);

        headerFilename.textContent = this.HEADER_FILENAME;
        header.append(headerTitle, headerFilename);

        this.htmlElement.append(header);
    }

    private addHelpBlock(): void {
        const editor = document.createElement(TagNames.CODE_WRAPPER);
        editor.classList.add(CssClasses.CSS_VIEWER_HELP);
        const help = HtmlHelper.ElementFromHTML(htmlHelp);
        editor.append(help);
        this.htmlElement.append(editor);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.SECTION);
        element.classList.add(CssClasses.CSS_VIEWER);

        return element;
    }
}
