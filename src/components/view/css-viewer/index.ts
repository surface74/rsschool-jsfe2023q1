import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';

export default class CssViewerView extends DefaultView {
    private readonly HEADER_TITLE = 'CSS Viewer';
    private readonly HEADER_FILENAME = 'style.css';

    constructor() {
        super();
        this.configureHtml();
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
        element.classList.add(CssClasses.CSS_VIEWER);

        return element;
    }
}
