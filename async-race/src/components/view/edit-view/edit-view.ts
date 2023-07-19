import TagName from '../../../enums/tag-name';
import HtmlCreator, { ElementParams } from '../../../utils/html-creator';
import Button, { ButtonCss, ButtonParams } from '../../button/button';
import DefaultView from '../default-view';
import './edit-view.scss';

enum EditViewCss {
  EDIT_VIEW = 'edit-view',
  INPUT_TEXT = 'edit-view__input-text',
  INPUT_COLOR = 'edit-view__input-color',
}

export default class EditView extends DefaultView {
  private nameInput: HTMLElement;

  private colorInput: HTMLElement;

  private INPUT_COLOR_ATTRIBUTE: [string, string] = ['type', 'color'];

  constructor(buttonText: string, callback: () => void) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [EditViewCss.EDIT_VIEW],
      textContent: '',
    };
    super(params);

    this.nameInput = this.addNameInput();
    this.colorInput = this.addColorInput();
    this.addButton(buttonText, callback);
  }

  private addNameInput() {
    const params: ElementParams = {
      tag: TagName.INPUT,
      classNames: [EditViewCss.INPUT_TEXT],
      textContent: '',
    };

    this.nameInput = new HtmlCreator(params).getElement();
    this.getCreator().addInnerElement(this.nameInput);

    return this.nameInput;
  }

  private addColorInput() {
    const params: ElementParams = {
      tag: TagName.INPUT,
      classNames: [EditViewCss.INPUT_COLOR],
      textContent: '',
    };

    this.colorInput = new HtmlCreator(params).getElement();
    this.colorInput.setAttribute(...this.INPUT_COLOR_ATTRIBUTE);
    this.getCreator().addInnerElement(this.colorInput);

    return this.colorInput;
  }

  private addButton(buttonText: string, callback: () => void) {
    const params: ButtonParams = {
      classNames: [ButtonCss.BUTTON],
      textContent: buttonText,
      callback,
    };

    const button = new Button(params).getElement();
    this.getElement().append(button);
  }

  public setViewValues(textValue: string, colorValue: string): void {
    if (this.nameInput instanceof HTMLInputElement) {
      this.nameInput.value = textValue;
    }
    if (this.colorInput instanceof HTMLInputElement) {
      this.colorInput.value = colorValue;
    }
  }

  public getViewValues(): { name: string; color: string } {
    const result = { name: '', color: '' };
    if (this.nameInput instanceof HTMLInputElement) {
      result.name = this.nameInput.value;
    }
    if (this.colorInput instanceof HTMLInputElement) {
      result.color = this.colorInput.value;
    }

    return result;
  }
}
