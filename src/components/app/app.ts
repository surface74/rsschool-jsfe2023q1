import MainView from '../view/main-view/index';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        const mainView = new MainView();

        document.body.append(mainView.getHtmlElement());
        mainView.initGame();
    }
}
