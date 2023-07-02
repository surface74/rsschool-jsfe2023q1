/**
 * @jest-environment jsdom
 */

import Level4 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level4();
        expect(level.getHelpElement()).toBeInstanceOf(DocumentFragment);
    });
});
