/**
 * @jest-environment jsdom
 */

import Level7 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level7();
        expect(level.getHelpElement()).toBeInstanceOf(DocumentFragment);
    });
});
