import News from './news/news';
import Sources from './sources/sources';
import { INewsDataItem, INewsData, ISource, ISourceItem } from '../../types';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsData): void {
        const values: INewsDataItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISource): void {
        const values: ISourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
