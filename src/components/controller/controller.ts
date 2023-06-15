import AppLoader from './appLoader';
import { Endpoint } from '../../enums';
import { DataType } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: (source: DataType) => void) {
        super.getResp(
            {
                endpoint: Endpoint.SOURCES,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: (data: DataType) => void) {
        let target: EventTarget | null = e.target;
        if (target instanceof HTMLElement) {
            const newsContainer: EventTarget | null = e.currentTarget;
            if (newsContainer instanceof HTMLElement) {
                while (target !== newsContainer) {
                    if ((<HTMLElement>target).classList.contains('source__item')) {
                        const sourceId: string | null = (<HTMLElement>target).getAttribute('data-source-id');
                        if (sourceId) {
                            const dataSource: string | null = newsContainer.getAttribute('data-source');
                            if (dataSource !== sourceId) {
                                newsContainer.setAttribute('data-source', sourceId);
                                super.getResp(
                                    {
                                        endpoint: Endpoint.EVERYTHING,
                                        options: {
                                            sources: sourceId,
                                        },
                                    },
                                    callback
                                );
                            }
                        }
                        return;
                    }
                    target = (<HTMLElement>target).parentNode;
                }
            }
        }
    }
}

export default AppController;
