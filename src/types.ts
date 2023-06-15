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

export enum Endpoint {
    EVERYTHING = 'everything',
    SOURCES = 'sources',
}

export enum HTTPMethod {
    GET = 'GET',
    POST = 'POST',
}

export enum ResponceStatus {
    'Unauthorised' = 401,
    'NotFound' = 404,
}

export type DataType = ISource & INews;
