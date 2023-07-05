import { TagNames } from '../../enums/view/tag-names';
import { Attributes } from '../../enums/view/attributes';

export default class Highlight {
    private readonly THEME_CSS = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/vs2015.min.css';
    private readonly LIBRARY_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/es/highlight.min.js';
    private readonly TEMPLATE_SCRIPT = `import hljs from "{{TEMPLATE_PATH}}";`;
    cssElement: HTMLElement;
    scriptElement: HTMLElement;

    constructor() {
        this.cssElement = this.createCssElement();
        this.scriptElement = this.createScriptElement();
    }

    getCssElement(): HTMLElement {
        return this.cssElement;
    }

    getScriptElement(): HTMLElement {
        return this.scriptElement;
    }

    createCssElement(): HTMLElement {
        const link = document.createElement(TagNames.LINK);
        link.setAttribute(Attributes.HREF, this.THEME_CSS);
        link.setAttribute(Attributes.REL, 'stylesheet');
        return link;
    }

    createScriptElement(): HTMLElement {
        const script = document.createElement(TagNames.SCRIPT);
        script.setAttribute(Attributes.TYPE, 'module');
        script.textContent = this.TEMPLATE_SCRIPT.replace('{{TEMPLATE_PATH}}', this.LIBRARY_PATH);
        return script;
    }
}
