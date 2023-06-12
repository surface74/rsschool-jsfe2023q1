import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INews, ISource } from '../../types';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: unknown) => this.view.drawNews(data as INews))
        );
        this.controller.getSources((data: unknown) => this.view.drawSources(data as ISource));
    }
}

export default App;
