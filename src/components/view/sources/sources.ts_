import './sources.css';
import { SourceItem } from '../../../types';

class Sources {
    public draw(data: SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp) {
            data.forEach((item: SourceItem) => {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof HTMLElement) {
                    const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
                    if (sourceItemName) {
                        sourceItemName.textContent = item.name;
                    }
                    const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
                    if (sourceItem) {
                        sourceItem.setAttribute('data-source-id', item.id);
                    }
                    fragment.append(sourceClone);
                }
            });
        }

        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources) {
            sources.append(fragment);
        }
    }
}

export default Sources;
