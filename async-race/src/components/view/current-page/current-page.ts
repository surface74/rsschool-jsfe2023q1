import './current-page.scss';
import TagName from '../../../enums/tag-name';
import { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';

enum CurrentPageCss {
  CURRENT_PAGE = 'current-page',
}

enum TEXT {
  TITLE = 'PAGE',
}

export default class CurrentPage extends DefaultView {
  private currentPage: number;

  constructor(currentPage: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [CurrentPageCss.CURRENT_PAGE],
      textContent: `${TEXT.TITLE} #${currentPage}`,
    };
    super(params);

    this.currentPage = currentPage;
  }

  public setCurrentPage(currentPage: number): void {
    this.currentPage = currentPage;
    this.updateTitle();
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  private updateTitle() {
    this.getElement().textContent = `${TEXT.TITLE} #${this.currentPage}`;
  }
}
