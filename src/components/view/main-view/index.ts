import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import CssViewerView from '../css-viewer/index';
import DefaultView from '../default-view';
import HtmlViewerView from '../html-viewer/html-viewer-view';
import LevelView from '../level/level-view';
import TableView from '../table/table-view';
import Observer from '../../observer/observer';
import Level1 from '../../levels/level-1';

export default class MainView extends DefaultView {
    constructor() {
        super();

        const level1 = new Level1();

        const observerMethod = new Observer();

        const levelView = new LevelView(observerMethod);
        const tableView = new TableView(observerMethod);
        const htmlViewerView = new HtmlViewerView(observerMethod);
        const cssViewerView = new CssViewerView();

        htmlViewerView.getHtmlElement().append(level1.getHtmlElement());
        levelView.getHtmlElement().append(level1.getLevelTitle());

        this.htmlElement.append(
            tableView.getHtmlElement(),
            levelView.getHtmlElement(),
            htmlViewerView.getHtmlElement(),
            cssViewerView.getHtmlElement()
        );
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
