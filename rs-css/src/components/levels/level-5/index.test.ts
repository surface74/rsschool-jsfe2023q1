/**
 * @jest-environment jsdom
 */

import Level5 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level5();
        expect(level.getHelpElement()).toBeInstanceOf(DocumentFragment);
    });
});
