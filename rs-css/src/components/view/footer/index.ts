import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import { Attributes } from '../../../enums/view/attributes';
import DefaultView from '../default-view';

export default class Footer extends DefaultView {
    private readonly PRODUCTION_YEAR = '©2023';
    private readonly GITHUB_LINK = 'https://github.com/rolling-scopes-school/surface74-JSFE2023Q1';
    private readonly COURSE_LINK = 'https://rs.school/js';
    private readonly PROJECT_NAME = 'RS-CSS';

    constructor() {
        super();
        this.configHtml();
    }

    private configHtml() {
        const paragraph = document.createElement(TagNames.DIV);
        paragraph.classList.add(CssClasses.FOOTER_WRAPPER);

        const copyright = document.createElement(TagNames.SECTION_TITLE);
        copyright.classList.add(CssClasses.FOOTER_COPYRIGHT);
        copyright.textContent = this.PRODUCTION_YEAR;

        const githubLink = document.createElement(TagNames.A);
        githubLink.classList.add(CssClasses.FOOTER_AUTHOR);
        githubLink.setAttribute(Attributes.HREF, this.GITHUB_LINK);
        githubLink.textContent = this.PROJECT_NAME;

        const courseLink = document.createElement(TagNames.A);
        courseLink.classList.add(CssClasses.FOOTER_COURSE);
        courseLink.setAttribute(Attributes.HREF, this.GITHUB_LINK);

        paragraph.append(copyright, githubLink, courseLink);
        this.htmlElement.append(paragraph);
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.FOOTER);
        element.classList.add(CssClasses.FOOTER);

        return element;
    }
}
