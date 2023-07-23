import './page-title.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';

enum PageTitleCss {
  PAGE_TITLE = 'page-title',
}

export default class PageTitle extends DefaultView {
  private itemCounter: number;

  private pageTitle: string;

  constructor(pageTitle: string, itemCount: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageTitleCss.PAGE_TITLE],
      textContent: `${pageTitle} (${itemCount})`,
    };
    super(params);

    this.itemCounter = itemCount;
    this.pageTitle = pageTitle;
  }

  public setItemCount(itemCount: number): void {
    this.itemCounter = itemCount;
    this.updateTitle();
  }

  private updateTitle() {
    this.getElement().textContent = `${this.pageTitle} (${this.itemCounter})`;
  }
}
