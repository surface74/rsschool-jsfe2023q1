import News from './news/news';
import Sources from './sources/sources';
import { Article, INews, ISource, SourceItem, DataType } from '../../types';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: DataType): void {
        if ((<INews>data).articles) {
            const values: Article[] = (<INews>data)?.articles ? (<INews>data)?.articles : [];
            this.news.draw(values);
        }
    }

    public drawSources(data: DataType): void {
        if ((<ISource>data).sources) {
            const values: SourceItem[] = (<ISource>data)?.sources ? (<ISource>data)?.sources : [];
            this.sources.draw(values);
        }
    }
}

export default AppView;
