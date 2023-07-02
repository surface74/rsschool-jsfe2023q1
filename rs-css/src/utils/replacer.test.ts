import Replacer from './replacer';

describe('when using Replacer', () => {
    it('return correct Code', () => {
        const value = `<div class="{{TABLE_ITEM}} {{TABLE_ITEM_SELECTABLE}} {{POSITION_CONTAINER}} {{TABLE_ITEM_ACTIVE}}"`;
        const result = `<div class="table-item table__item_selectable position-container table__item_active"`;
        const replacer = new Replacer(value);
        expect(replacer.getText()).toEqual(result);
    });
});
