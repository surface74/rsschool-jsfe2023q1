/**
 * @jest-environment jsdom
 */

import Level3 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level3();
        expect(level.getHelpElement()).toBeInstanceOf(HTMLElement);
    });
});
