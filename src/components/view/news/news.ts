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
                    const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
                    if (newsMetaPhoto) {
                        newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                    }
                    const newsMetaAthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
                    if (newsMetaAthor) {
                        newsMetaAthor.textContent = item.author || item.source.name;
                    }
                    const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
                    if (newsMetaDate) {
                        newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                    }
                    const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector(
                        '.news__description-title'
                    );
                    if (newsDescriptionTitle) {
                        newsDescriptionTitle.textContent = item.title;
                    }
                    const newsDescriptionSource: HTMLElement | null = newsClone.querySelector(
                        '.news__description-source'
                    );
                    if (newsDescriptionSource) {
                        newsDescriptionSource.textContent = item.source.name;
                    }
                    const newsDescriptionContent: HTMLElement | null = newsClone.querySelector(
                        '.news__description-content'
                    );
                    if (newsDescriptionContent) {
                        newsDescriptionContent.textContent = item.description;
                    }
                    const newsReadMore: HTMLElement | null = newsClone.querySelector('.news__read-more a');
                    if (newsReadMore) {
                        newsReadMore.setAttribute('href', item.url);
                    }

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
