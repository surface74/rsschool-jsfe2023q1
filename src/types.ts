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

export interface INews {
    status: string;
    totalResults: number;
    articles: Article[];
}

export type SourceItem = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export interface ISource {
    status: string;
    sources: SourceItem[];
}

export interface IGetResponce {
    endpoint: Endpoint;
    options?: QueryOption;
}

export type QueryOption = {
    sources?: string;
    apiKey?: string;
};

export type Endpoint = 'everything' | 'sources';

export type HTTPMethod = 'GET' | 'POST';

export enum ResponceStatus {
    'Unauthorised' = 401,
    'NotFound' = 404,
}
