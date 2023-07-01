import './index.scss';
import { CssClasses } from '../../enums/view/css-classes';
import { TagNames } from '../../enums/view/tag-names';
import { EventName } from '../../enums/events/event-names';
import { KeyCodes } from '../../types/key-codes';

export default class Dialog {
    element: HTMLDialogElement;
    title: string;

    constructor(title: string) {
        this.title = title;
        this.element = this.createElement();
        this.configElement();
    }

    getDialog(): HTMLDialogElement {
        return this.element;
    }

    private configElement() {
        const onCloseDialogHandler = this.onCloseDialog.bind(this);
        this.element.addEventListener(EventName.CLICK, onCloseDialogHandler);
        this.element.addEventListener(EventName.KEY_DOWN, onCloseDialogHandler);
    }

    private onCloseDialog(e: Event): void {
        if (e instanceof MouseEvent || (e instanceof KeyboardEvent && e.code === KeyCodes.ESC)) {
            this.element.remove();
        }
    }

    private createElement(): HTMLDialogElement {
        const element = document.createElement(TagNames.DIALOG);
        element.textContent = this.title;
        element.classList.add(CssClasses.DIALOG);

        return element;
    }
}
