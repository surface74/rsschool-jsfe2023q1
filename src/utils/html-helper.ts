export default class HtmlHelper {
    static ElementFromHTML(htmlString: string): DocumentFragment {
        const template: HTMLTemplateElement = document.createElement('template');
        template.innerHTML = htmlString;
        const element: DocumentFragment = template.content;

        return element;
    }
}
