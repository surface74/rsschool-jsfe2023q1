import { ISource, INews } from './interfaces';

export type Article = {
    source: Pick<SourceItem, 'id' | 'name'>;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type SourceItem = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type QueryOption = {
    sources?: string;
    apiKey?: string;
};

export type DataType = ISource & INews;

export const MAX_ARTICLES = 10;
