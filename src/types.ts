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
