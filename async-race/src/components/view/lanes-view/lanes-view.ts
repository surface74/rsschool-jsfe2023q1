import './lanes-view.scss';
import { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';
import TagName from '../../../enums/tag-name';

enum LanesViewCss {
  LANES_VIEW = 'lanes-view',
}

export default class LanesView extends DefaultView {
  constructor() {
    const params: ElementParams = {
      tag: TagName.SECTION,
      classNames: [LanesViewCss.LANES_VIEW],
      textContent: '',
    };

    super(params);
  }
}
