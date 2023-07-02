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
import TextGenerator from '../../../utils/text-generator';
import Storage from '../../../utils/storage';

export default class MainView extends DefaultView {
    private readonly TYPE_SPEED = 100;
    private readonly LAST_LEVEL_DONE_MESSAGE = `Congrats! You've done the last level!`;
    private readonly ALL_LEVEL_DONE_MESSAGE = `Congrats! You've done all levels!`;

    levelView: LevelView;
    boardView: BoardView;
    htmlViewerView: HtmlViewerView;
    cssViewerView: CssViewerView;
    levelStorage: LevelStorage;
    currentLevel = 1;

    constructor() {
        super();
        this.levelStorage = new LevelStorage();

        this.restoreState();

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
    }

    private restoreState() {
        const levels = Storage.RestoreLevelsState();
        if (levels) {
            this.levelStorage.setStorage(levels);
        }
        const currentLevel = Storage.RestoreCurrentLevelState();
        this.currentLevel = currentLevel || 1;
    }

    private saveState() {
        Storage.SaveCurrentLevelState(this.currentLevel);
        Storage.SaveLevelsState(this.levelStorage.storage);
    }

    public initGame() {
        this.addEventListners();
        this.loadLevel(this.currentLevel);
    }

    private addEventListners() {
        document.body.addEventListener(EventName.LEVEL_SELECTED, this.onSelectLevel.bind(this));

        const onCheckCssHandler = this.onCheckCss.bind(this);

        const buttonEnter = document.querySelector(`.${CssClasses.CSS_VIEWER_BUTTON_ENTER}`);
        if (buttonEnter) {
            buttonEnter.addEventListener(EventName.CLICK, onCheckCssHandler);
        }

        const input = document.querySelector(`.${CssClasses.CSS_VIEWER_INPUT}`);
        if (input) {
            input.addEventListener(EventName.KEY_DOWN, onCheckCssHandler);
        }

        const buttonHelp = document.querySelector(`.${CssClasses.CSS_VIEWER_BUTTON_HELP}`);
        if (buttonHelp) {
            buttonHelp.addEventListener(EventName.CLICK, this.showRightAnswer.bind(this));
        }

        const buttonReset = document.querySelector(`.${CssClasses.LEVEL_VIEWER_BUTTON_RESET}`);
        if (buttonReset) {
            buttonReset.addEventListener(EventName.CLICK, this.resetProggress.bind(this));
        }
    }

    private resetProggress(): void {
        this.levelStorage.init();
        this.currentLevel = 1;
        this.loadLevel(1);
    }

    private showRightAnswer(): void {
        this.cssViewerView.clearInput();
        const level = this.levelStorage.getLevel(this.currentLevel);
        if (level) {
            const answer = level.getAnswer()[0];
            const input = document.querySelector(`.${CssClasses.CSS_VIEWER_INPUT}`);
            if (input instanceof HTMLInputElement) {
                this.levelStorage.levelDoneWithHelp(this.currentLevel);
                this.typeAnswer<HTMLInputElement>(TextGenerator.getGenerator(answer), input);
            }
        }
        this.saveState();
    }

    typeAnswer<T>(generator: Generator, input: T) {
        setTimeout(() => {
            const result = generator.next();
            if (result.value) {
                if (input instanceof HTMLInputElement) {
                    input.value += result.value;
                } else if (input instanceof HTMLElement) {
                    input.innerHTML += result.value;
                }
                this.typeAnswer(generator, input);
            }
        }, this.TYPE_SPEED);
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
            const level = this.levelStorage.getLevel(this.currentLevel);
            if (level) {
                const input = document.querySelector(`.${CssClasses.CSS_VIEWER_INPUT}`);
                if (input instanceof HTMLInputElement) {
                    const answer = input.value
                        .split(' ')
                        .filter((s) => s)
                        .join(' ');

                    const levelId = Number.parseInt(answer);
                    if (levelId && this.levelStorage.length >= levelId) {
                        this.loadLevel(levelId);
                    } else if (level.getAnswer().includes(answer)) {
                        this.processRightAnswer();
                    } else {
                        input.classList.add(CssClasses.CSS_VIEWER_INPUT_ERROR);
                        setTimeout(() => input.classList.remove(CssClasses.CSS_VIEWER_INPUT_ERROR), 1000);
                    }
                }
            }
        }
    }

    private processRightAnswer() {
        this.saveState();
        this.cssViewerView.clearInput();
        this.levelStorage.levelDone(this.currentLevel);
        this.levelView.fillLevelsList();
        this.boardView.hideActiveElement();

        if (this.levelStorage.isAllLevelsDone()) {
            this.showCongrats(this.ALL_LEVEL_DONE_MESSAGE);
        } else if (this.levelStorage.length > this.currentLevel) {
            setTimeout(() => {
                this.loadLevel(this.currentLevel + 1);
            }, 1000);
        } else {
            this.showCongrats(this.LAST_LEVEL_DONE_MESSAGE);
            this.loadLevel(this.currentLevel);
        }
    }

    private showCongrats(message: string): void {
        const dialog = new Dialog(message).getDialog();
        document.body.append(dialog);
        dialog.showModal();
    }

    private loadLevel(levelId: number): void {
        this.cssViewerView.clearInput();
        this.levelView.fillLevelsList();
        this.levelView.setCurrentLevelMark(levelId);

        const level = this.levelStorage.getLevel(levelId);
        if (level) {
            this.currentLevel = levelId;
            this.boardView.setLevelOrder(level.getLevelTitle());
            this.boardView.fillTable(level.getViewElement());
            this.htmlViewerView.setEditorContent(level.getHelpElement());
        }
        this.saveState();
    }

    protected createHtml(): HTMLElement {
        const element = document.createElement(TagNames.MAIN);
        element.classList.add(CssClasses.MAIN);
        return element;
    }
}
