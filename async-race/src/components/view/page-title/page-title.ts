import './page-title.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';

enum PageTitleCss {
  PAGE_TITLE = 'page-title',
}

export default class PageTitle extends DefaultView {
  private carCounter: number;

  private pageTitle: string;

  constructor(pageTitle: string, carCount: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageTitleCss.PAGE_TITLE],
      textContent: `${pageTitle} (${carCount})`,
    };
    super(params);

    this.carCounter = carCount;
    this.pageTitle = pageTitle;
  }

  public setCarCount(carCount: number): void {
    this.carCounter = carCount;
    this.updateTitle();
  }

  private updateTitle() {
    this.getElement().textContent = `${this.pageTitle} (${this.carCounter})`;
  }
}
