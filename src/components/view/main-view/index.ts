import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import CssViewerView from '../css-viewer/index';
import HtmlViewerView from '../html-viewer/index';
import LevelView from '../level-view/index';
import BoardView from '../board/index';
import Observer from '../../observer/observer';
import LevelStorage from '../../level-storage/level-storage';
import { LevelItem } from '../../../types/level-item';
import { EventName } from '../../../enums/events/event-names';

export default class MainView extends DefaultView {
    levelView: LevelView;
    boardView: BoardView;
    htmlViewerView: HtmlViewerView;
    cssViewerView: CssViewerView;
    levels: LevelItem[];

    constructor() {
        super();

        const observerMethod = new Observer();

        this.levels = new LevelStorage().storage;
        this.levelView = new LevelView(observerMethod, this.levels);
        this.boardView = new BoardView();
        this.htmlViewerView = new HtmlViewerView(observerMethod);
        this.cssViewerView = new CssViewerView();

        this.htmlElement.append(
            this.boardView.getHtmlElement(),
            this.levelView.getHtmlElement(),
            this.htmlViewerView.getHtmlElement(),
            this.cssViewerView.getHtmlElement()
        );

        // document.body.addEventListener(EventName.LEVEL_SELECTED, this.onSelectLevel.bind(this));
    }

    // private onSelectLevel(e: CustomEvent) {
    //     console.log();
    // }

    public initGame() {
        this.levelView.fillLevelsList();
        this.loadLevel(1);
    }

    private loadLevel(levelNumber: number): void {
        const level = this.levels[levelNumber - 1].level;

        this.boardView.setLevelOrder(level.getLevelTitle());
        this.htmlViewerView.setEditorContent(level.getHtmlElement());
        this.boardView.fillTable();
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
