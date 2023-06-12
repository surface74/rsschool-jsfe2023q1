import { Endpoint, HTTPMethod, IGetResponce, QueryOption, ResponceStatus } from '../../types';

class Loader {
    baseLink: string;
    options: QueryOption;

    constructor(baseLink: string, options: QueryOption) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: IGetResponce,
        callback = (): void => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ResponceStatus.NotFound || res.status === ResponceStatus.Unauthorised)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: QueryOption, endpoint: Endpoint): string {
        const urlOptions: QueryOption = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof QueryOption]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: HTTPMethod, endpoint: Endpoint, callback: (data:string)=> void, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => (res as Response).json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
