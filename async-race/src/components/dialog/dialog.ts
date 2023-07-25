import './dialog.scss';
import EventName from '../../enums/event-name';
import TagName from '../../enums/tag-name';

enum DialogCss {
  DIALOG = 'dialog',
}

enum KeyCodes {
  ENTER = 'Enter',
  NUMPAD_ENTER = 'NumpadEnter',
  ESC = 'Escape',
}

export default class Dialog {
  private element: HTMLDialogElement;

  private title: string;

  constructor(title: string) {
    this.title = title;
    this.element = this.createElement();
    this.configElement();
  }

  public getDialog(): HTMLDialogElement {
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
    const element = document.createElement(TagName.DIALOG);
    element.textContent = this.title;
    element.classList.add(DialogCss.DIALOG);

    return element;
  }
}
