import './page-holder.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';

enum PageHolderCss {
  PAGE_HOLDER = 'page-holder',
}

export default class PageHolder extends DefaultView {
  constructor() {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageHolderCss.PAGE_HOLDER],
      textContent: '',
    };
    super(params);
  }

  public setContent(content: HTMLElement) {
    this.getCreator().clearInnerContent();
    this.getCreator().addInnerElement(content);
  }
}
