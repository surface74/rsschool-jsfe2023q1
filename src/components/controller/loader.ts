import { Endpoint, HTTPMethod, IGetResponce, QueryOption, ResponceStatus } from '../../types';

class Loader<T> {
    private readonly baseLink: string;
    private readonly options: QueryOption;

    constructor(baseLink: string, options: QueryOption) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: IGetResponce,
        callback: (data: T) => void = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponceStatus.NotFound || res.status === ResponceStatus.Unauthorised)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: QueryOption, endpoint: Endpoint): string {
        const urlOptions: QueryOption = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof QueryOption]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: HTTPMethod, endpoint: Endpoint, callback: (data: T) => void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: T) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
