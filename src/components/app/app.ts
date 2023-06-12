import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsData, ISource } from '../../types';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: unknown) => this.view.drawNews(data as INewsData))
        );
        this.controller.getSources((data: unknown) => this.view.drawSources(data as ISource));
    }
}

export default App;
