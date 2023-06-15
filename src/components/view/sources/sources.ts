import './sources.css';
import { SourceItem } from '../../../types';

class Sources {
    public draw(data: SourceItem[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLElement | null = document.querySelector('#sourceItemTemp');
        if (sourceItemTemp instanceof HTMLTemplateElement) {
            data.forEach((item: SourceItem) => {
                const sourceClone: Node = sourceItemTemp.content.cloneNode(true);
                if (sourceClone instanceof DocumentFragment) {
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
        const sourcesElement: HTMLElement | null = document.querySelector('.sources');
        if (sourcesElement) {
            sourcesElement.append(fragment);
        }
    }
}

export default Sources;
