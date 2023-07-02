/**
 * @jest-environment jsdom
 */

import Favicon from './index';

describe('when creating Favicon', () => {
    it('return created DocumentFragment', () => {
        const element = new Favicon();
        expect(element.getHtmlElement()).toBeInstanceOf(DocumentFragment);
    });
});
