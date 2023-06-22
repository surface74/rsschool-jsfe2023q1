import MainView from '../view/main-view/index';

export default class App {
    constructor() {
        this.init();
    }

    init() {
        const mainViewElement = new MainView().getHtmlElement();
        document.body.append(mainViewElement);
    }
}
