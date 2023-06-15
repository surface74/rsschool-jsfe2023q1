import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataType } from '../../types';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.start();
    }

    public start() {
        const element: HTMLElement | null = document.querySelector('.sources');
        if (element) {
            element.addEventListener('click', (e: MouseEvent) =>
                this.controller.getNews(e, (data: DataType) => this.view.drawNews(data))
            );
        }
        this.controller.getSources((data: DataType) => this.view.drawSources(data));
    }
}

export default App;
