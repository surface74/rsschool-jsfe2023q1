/**
 * @jest-environment jsdom
 */

import Level6 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level6();
        expect(level.getHelpElement()).toBeInstanceOf(DocumentFragment);
    });
});
