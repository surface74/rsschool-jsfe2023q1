import './page-winners.scss';
import DefaultView from '../default-view';
import PageTitle from '../page-title/page-title';
import { ElementParams } from '../../../utils/html-creator';
import TagName from '../../../enums/tag-name';

enum PageWinnersCss {
  PAGE_WINNERS = 'page-winners',
}

export default class PageWinners extends DefaultView {
  private pageTitle: PageTitle;

  private readonly PAGE_TITLE: string = 'WINNERS';

  constructor(totalCars: number) {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageWinnersCss.PAGE_WINNERS],
      textContent: '',
    };
    super(params);

    this.pageTitle = new PageTitle(this.PAGE_TITLE, totalCars);

    this.configView();
  }

  public updateTitle(totalCars: number) {
    this.pageTitle.setItemCount(totalCars);
  }

  private configView() {
    this.getCreator().addInnerElement(this.pageTitle.getElement());
  }
}
