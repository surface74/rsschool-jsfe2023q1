export interface INewsDataItem {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface IDrawDataItem {
    name: string;
    id: string;
}

export interface IServerData {
    status: string;
    totalResults: number;
    articles: INewsDataItem[];
}

export interface ISourceItem {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ISource {
    status: string;
    sources: ISourceItem[];
}

export interface IGetResponce {
    endpoint: Endpoint;
    options: { sources?: string };
}

export type QueryOption = {
    sources?: string;
    apiKey?: string;
}

export type Endpoint = 'everything' | 'sources';

export type HTTPMethod = 'GET' | 'POST';

export enum ResponceStatus {
    'Unauthorised' = 401,
    'NotFound' = 404,
}
