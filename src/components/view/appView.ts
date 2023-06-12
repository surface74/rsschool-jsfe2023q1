import News from './news/news';
import Sources from './sources/sources';
import { Article, INews, ISource, SourceItem } from '../../types';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INews): void {
        const values: Article[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ISource): void {
        const values: SourceItem[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
