import './page-garage.scss';
import DefaultView from '../view/default-view';
import PageTitle from '../view/page-title/page-title';
import { ElementParams } from '../../utils/html-creator';
import TagName from '../../enums/tag-name';

enum PageGarrageCss {
  PAGE_GARAGE = 'page-garage',
}

export default class PageGarrage extends DefaultView {
  private pageTitle: PageTitle;

  private readonly PAGE_TITLE: string = 'GARAGE';

  constructor() {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [PageGarrageCss.PAGE_GARAGE],
      textContent: '',
    };
    super(params);

    this.pageTitle = new PageTitle(this.PAGE_TITLE, 100);
  }
}
