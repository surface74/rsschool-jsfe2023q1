import { Attributes } from '../enums/view/attributes';
import { CssClasses } from '../enums/view/css-classes';

export default class Replacer {
    text: string;
    constructor(template: string) {
        this.text = template;
        this.replace();
    }
    private replace() {
        const cssEntries = Object.entries(CssClasses);
        cssEntries.forEach(([key, value]) => {
            this.text = this.text.replace(RegExp(`{{${key}}}`, 'g'), value);
        });
        const attributeEntries = Object.entries(Attributes);
        attributeEntries.forEach(([key, value]) => {
            this.text = this.text.replace(RegExp(`{{${key}}}`, 'g'), value);
        });
    }

    public getText(): string {
        return this.text;
    }
}
