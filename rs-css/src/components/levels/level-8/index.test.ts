/**
 * @jest-environment jsdom
 */

import Level8 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level8();
        expect(level.getHelpElement()).toBeInstanceOf(DocumentFragment);
    });
});
