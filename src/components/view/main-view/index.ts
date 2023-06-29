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
import { EventName } from '../../../enums/events/event-names';
import { KeyCodes } from '../../../types/key-codes';

export default class MainView extends DefaultView {
    levelView: LevelView;
    boardView: BoardView;
    htmlViewerView: HtmlViewerView;
    cssViewerView: CssViewerView;
    levelStorage: LevelStorage;
    currentLevel = 1;

    constructor() {
        super();

        const observerMethod = new Observer();

        this.levelStorage = new LevelStorage();
        this.levelView = new LevelView(this.levelStorage.storage);
        this.boardView = new BoardView();
        this.htmlViewerView = new HtmlViewerView(observerMethod);
        this.cssViewerView = new CssViewerView();

        this.htmlElement.append(
            this.boardView.getHtmlElement(),
            this.levelView.getHtmlElement(),
            this.htmlViewerView.getHtmlElement(),
            this.cssViewerView.getHtmlElement()
        );

        document.body.addEventListener(EventName.LEVEL_SELECTED, this.onSelectLevel.bind(this));
    }

    private onSelectLevel(e: Event): void {
        if (e instanceof CustomEvent) {
            const levelId = Number(e.detail);
            this.loadLevel(levelId);
        }
    }

    private onCheckCss(e: Event): void {
        if (
            e instanceof MouseEvent ||
            (e instanceof KeyboardEvent && (e.code === KeyCodes.ENTER || e.code === KeyCodes.NUMPAD_ENTER))
        ) {
            const input = document.querySelector(`.${CssClasses.CSS_VIEWER_INPUT}`);
            if (input instanceof HTMLInputElement) {
                const level = this.levelStorage.getLevel(this.currentLevel);
                if (level) {
                    if (level.getAnswer().includes(input.value.trim())) {
                        input.value = '';
                        this.levelStorage.levelDone(this.currentLevel);
                        this.levelView.fillLevelsList();
                        if (this.levelStorage.length < this.currentLevel) {
                            this.loadLevel(this.currentLevel + 1);
                        }
                    } else {
                        input.classList.add(CssClasses.CSS_VIEWER_INPUT_ERROR);
                        setTimeout(() => input.classList.remove(CssClasses.CSS_VIEWER_INPUT_ERROR), 1000);
                    }
                }
            }
        }
    }

    public initGame() {
        const onCheckCssHandler = this.onCheckCss.bind(this);
        const buttonEnter = document.querySelector(`.${CssClasses.CSS_VIEWER_BUTTON_ENTER}`);
        if (buttonEnter) {
            buttonEnter.addEventListener(EventName.CLICK, onCheckCssHandler);
            this.loadLevel(this.currentLevel);
        }

        const input = document.querySelector(`.${CssClasses.CSS_VIEWER_INPUT}`);
        if (input) {
            input.addEventListener(EventName.KEY_DOWN, onCheckCssHandler);
        }
    }

    private loadLevel(levelId: number): void {
        this.levelView.fillLevelsList();
        const level = this.levelStorage.getLevel(levelId);
        if (level) {
            this.currentLevel = levelId;
            this.boardView.setLevelOrder(level.getLevelTitle());
            this.htmlViewerView.setEditorContent(level.getHelpElement());
            this.boardView.fillTable(level.getViewElement());
        }
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
