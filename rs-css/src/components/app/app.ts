import MainView from '../view/main-view/index';
import Favicon from '../favicon/index';
import Footer from '../view/footer/index';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        const favicon = new Favicon();
        document.head.append(favicon.getHtmlElement());
        const mainView = new MainView();
        document.body.append(mainView.getHtmlElement());
        const footer = new Footer();
        document.body.append(footer.getHtmlElement());

        mainView.initGame();
    }
}
