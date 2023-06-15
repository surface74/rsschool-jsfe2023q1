import News from './news/news';
import Sources from './sources/sources';
import { Article, SourceItem, DataType } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: DataType): void {
        if (data.articles) {
            const values: Article[] = data?.articles ? data?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: DataType): void {
        if (data.sources) {
            const values: SourceItem[] = data?.sources ? data?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
