import { Article, SourceItem, QueryOption } from './types';
import { Endpoint } from './enums';

export interface INews {
    status: string;
    totalResults: number;
    articles: Article[];
}

export interface ISource {
    status: string;
    sources: SourceItem[];
}

export interface IGetResponce {
    endpoint: Endpoint;
    options?: QueryOption;
}
