/**
 * @jest-environment jsdom
 */

import Level from './level-1';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level();
        expect(level.getHtmlElement()).toBeInstanceOf(HTMLElement);
    });
});
