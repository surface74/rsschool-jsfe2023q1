/**
 * @jest-environment jsdom
 */

import Level1 from './level-1';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level1();
        expect(level.getHelpElement()).toBeInstanceOf(HTMLElement);
    });
});
