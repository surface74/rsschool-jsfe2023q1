import { Attributes } from '../enums/view/attributes';
import { CssClasses } from '../enums/view/css-classes';

export default class Replacer {
    text: string;
    constructor(template: string) {
        this.text = template;
        this.Css();
        this.Attributes();
    }

    private Css() {
        this.text = this.text
            .replace(/{{TABLE_ITEM_SELECTABLE}}/g, CssClasses.TABLE_ITEM_SELECTABLE)
            .replace(/{{TABLE_ITEM}}/g, CssClasses.TABLE_ITEM)
            .replace(/{{TABLE_ITEM_PLATE}}/g, CssClasses.TABLE_ITEM_PLATE)
            .replace(/{{TABLE_ITEM_BENTO}}/g, CssClasses.TABLE_ITEM_BENTO)
            .replace(/{{TABLE_ITEM_ORANGE}}/g, CssClasses.TABLE_ITEM_ORANGE)
            .replace(/{{TABLE_ITEM_PICKLE}}/g, CssClasses.TABLE_ITEM_PICKLE)
            .replace(/{{TABLE_ITEM_ACTIVE}}/g, CssClasses.TABLE_ITEM_ACTIVE)
            .replace(/{{HTML_CODE}}/g, CssClasses.HTML_VIEWER_CODE)
            .replace(/{{PADDING_LEFT}}/g, CssClasses.PADDING_LEFT)
            .replace(/{{SELECTABLE_CODE}}/g, CssClasses.SELECTABLE_CODE);
        return this;
    }

    private Attributes() {
        this.text = this.text
            .replace(/{{DATA_ITEM_ID}}/g, Attributes.DATA_ITEM_ID)
            .replace(/{{DATA_ITEM_TOOLTIP}}/g, Attributes.DATA_ITEM_TOOLTIP);
        return this;
    }

    public getText(): string {
        return this.text;
    }
}
