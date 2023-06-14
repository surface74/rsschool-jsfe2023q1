import './news.css';
import { Article } from '../../../types';

class News {
    public draw(data: Article[]) {
        const articles: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (newsItemTemp) {
            articles.forEach((item, idx) => {
                const newsClone: Node = newsItemTemp.content.cloneNode(true);
                if (newsClone instanceof HTMLElement) {
                    if (idx % 2) {
                        const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
                        if (newsItem) {
                            newsItem.classList.add('alt');
                        }
                    }

                    (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                        item.urlToImage || 'img/news_placeholder.jpg'
                    })`;
                    (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                        item.author || item.source.name;
                    (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                        .slice(0, 10)
                        .split('-')
                        .reverse()
                        .join('-');

                    (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
                    (newsClone.querySelector('.news__description-source') as HTMLElement).textContent =
                        item.source.name;
                    (newsClone.querySelector('.news__description-content') as HTMLElement).textContent =
                        item.description;
                    (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

                    fragment.append(newsClone);
                }
            });
        }

        const news: HTMLElement | null = document.querySelector('.news');
        if (news) {
            news.innerHTML = '';
            news.appendChild(fragment);
        }
    }
}

export default News;
