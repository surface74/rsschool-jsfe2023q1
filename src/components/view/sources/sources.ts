import './sources.css';
import { IDrawDataItem } from '../../../types';

class Sources {
    draw(data: IDrawDataItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item: IDrawDataItem) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
                if (sourceClone) {
                    (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                    (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);
                    fragment.append(sourceClone);
                }
            });
        }

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
