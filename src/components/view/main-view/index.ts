import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import CssViewerView from '../css-viewer/index';
import DefaultView from '../default-view';
import HtmlViewerView from '../html-viewer/index';
import LevelView from '../level-view/index';
import TableView from '../table/index';
import Observer from '../../observer/observer';
import LevelStorage from '../../level-storage/level-storage';
import { LevelItem } from '../../../types/level-item';

export default class MainView extends DefaultView {
    levelView: LevelView;
    tableView: TableView;
    htmlViewerView: HtmlViewerView;
    cssViewerView: CssViewerView;
    levels: LevelItem[];

    constructor() {
        super();

        const observerMethod = new Observer();

        this.levels = new LevelStorage().storage;
        this.levelView = new LevelView(observerMethod, this.levels);
        this.tableView = new TableView(observerMethod);
        this.htmlViewerView = new HtmlViewerView(observerMethod);
        this.cssViewerView = new CssViewerView();

        this.htmlElement.append(
            this.tableView.getHtmlElement(),
            this.levelView.getHtmlElement(),
            this.htmlViewerView.getHtmlElement(),
            this.cssViewerView.getHtmlElement()
        );

        this.initGame();
    }

    public initGame() {
        this.levelView.fillLevelsList();
        this.loadLevel(1);
    }

    private loadLevel(levelNumber: number): void {
        const level = this.levels[levelNumber - 1].level;
        this.htmlViewerView.setEditorContent(level.getHtmlElement());
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
