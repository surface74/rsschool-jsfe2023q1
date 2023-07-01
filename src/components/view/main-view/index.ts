import './index.scss';
import { CssClasses } from '../../../enums/view/css-classes';
import { TagNames } from '../../../enums/view/tag-names';
import DefaultView from '../default-view';
import CssViewerView from '../css-viewer/index';
import HtmlViewerView from '../html-viewer/index';
import LevelView from '../level-view/index';
import BoardView from '../board/index';
import LevelStorage from '../../level-storage/level-storage';
import { EventName } from '../../../enums/events/event-names';
import { KeyCodes } from '../../../types/key-codes';
import Dialog from '../../dialog/index';

export default class MainView extends DefaultView {
    levelView: LevelView;
    boardView: BoardView;
    htmlViewerView: HtmlViewerView;
    cssViewerView: CssViewerView;
    levelStorage: LevelStorage;
    currentLevel = 1;

    constructor() {
        super();

        this.levelStorage = new LevelStorage();
        this.levelView = new LevelView(this.levelStorage.storage);
        this.boardView = new BoardView();
        this.htmlViewerView = new HtmlViewerView();
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
                    const answer = input.value
                        .split(' ')
                        .filter((s) => s)
                        .join(' ');
                    if (level.getAnswer().includes(answer)) {
                        input.value = '';
                        this.levelStorage.levelDone(this.currentLevel);
                        this.levelView.fillLevelsList();
                        this.boardView.hideActiveElement();

                        if (this.levelStorage.length > this.currentLevel) {
                            setTimeout(() => {
                                console.log(`Next level: ${this.currentLevel + 1}`);
                                this.loadLevel(this.currentLevel + 1);
                            }, 1000);
                        } else {
                            this.showCongrats();
                        }
                    } else {
                        input.classList.add(CssClasses.CSS_VIEWER_INPUT_ERROR);
                        setTimeout(() => input.classList.remove(CssClasses.CSS_VIEWER_INPUT_ERROR), 1000);
                    }
                }
            }
        }
    }

    private showCongrats() {
        const dialog = new Dialog(`Congrats! You've done all levels!`).getDialog();
        document.body.append(dialog);
        dialog.showModal();
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
        this.levelView.setCurrentLevelMark(levelId);

        const level = this.levelStorage.getLevel(levelId);
        if (level) {
            this.currentLevel = levelId;
            this.boardView.setLevelOrder(level.getLevelTitle());
            this.boardView.fillTable(level.getViewElement());
            this.htmlViewerView.setEditorContent(level.getHelpElement());
        }
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
