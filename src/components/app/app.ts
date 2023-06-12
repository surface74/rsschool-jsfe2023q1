import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IServerData, ISource } from '../../types';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: IServerData) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISource) => this.view.drawSources(data));
    }
}

export default App;
