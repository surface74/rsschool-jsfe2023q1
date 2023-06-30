/**
 * @jest-environment jsdom
 */

import Level2 from './level-2';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level2();
        expect(level.getHelpElement()).toBeInstanceOf(HTMLElement);
    });
});
