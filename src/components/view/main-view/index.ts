import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import CssViewerView from '../css-viewer/index';
import DefaultView from '../default-view';
import HtmlViewerView from '../html-viewer/index';
import LevelView from '../level/index';
import TableView from '../table/index';
import Observer from '../../observer/observer';
import Level1 from '../../levels/level-1';

export default class MainView extends DefaultView {
    levelView: LevelView;
    tableView: TableView;
    htmlViewerView: HtmlViewerView;
    cssViewerView: CssViewerView;

    constructor() {
        super();

        const observerMethod = new Observer();

        this.levelView = new LevelView(observerMethod);
        this.tableView = new TableView(observerMethod);
        this.htmlViewerView = new HtmlViewerView(observerMethod);
        this.cssViewerView = new CssViewerView();

        this.htmlElement.append(
            this.tableView.getHtmlElement(),
            this.levelView.getHtmlElement(),
            this.htmlViewerView.getHtmlElement(),
            this.cssViewerView.getHtmlElement()
        );

        this.loadLevel();
    }

    public loadLevel(): void {
        const level1 = new Level1();
        // this.htmlViewerView.getHtmlElement().append(level1.getHtmlElement());
        this.htmlViewerView.setEditorContent(level1.getHtmlElement());
        this.levelView.getHtmlElement().append(level1.getLevelTitle());
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
