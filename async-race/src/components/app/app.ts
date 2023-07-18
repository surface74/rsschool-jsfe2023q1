import { TagName } from '../../enums/tag-name';
import HtmlCreator, { ElementParams } from '../../utils/html-creator';
import Favicon from '../favicon/index';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        const favicon = new Favicon();
        document.head.append(favicon.getHtmlElement());

        const param: ElementParams = {
            tag: TagName.DIV,
            classNames: ['red'],
        };

        const element = new HtmlCreator(param).getElement();
        document.body.append(element);
        //     const mainView = new MainView();
        //     document.body.append(mainView.getHtmlElement());

        //     const footer = new Footer();
        //     document.body.append(footer.getHtmlElement());

        //     mainView.initGame();
    }
}
