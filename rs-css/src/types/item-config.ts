import { ItemPosition } from '../enums/view/item-position';
import { ItemSize } from '../enums/view/item-size';

export type ItemConfig = {
    size: ItemSize;
    container: ItemPosition;
    isActive: boolean;
    tooltip: string;
    itemId: number;
};
