/**
 * @jest-environment jsdom
 */

import Level9 from './index';

describe('when creating Level', () => {
    it('return created HTMLElement', () => {
        const level = new Level9();
        expect(level.getHelpElement()).toBeInstanceOf(DocumentFragment);
    });
});
