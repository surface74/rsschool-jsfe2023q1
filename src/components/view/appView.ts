import News from './news/news';
import Sources from './sources/sources';
import { INewsDataItem, IServerData, ISource, ISourceItem } from '../../types';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: IServerData): void {
        const values: INewsDataItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISource) {
        const values: ISourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
