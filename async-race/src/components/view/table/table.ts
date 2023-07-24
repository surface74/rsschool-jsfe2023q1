import './table.scss';
import { ElementParams } from '../../../utils/html-creator';
import DefaultView from '../default-view';
import TagName from '../../../enums/tag-name';
import TableHeader from '../table-header/table-header';

enum TableCss {
  TABLE = 'table',
}

export default class Table extends DefaultView {
  private tableHeader: TableHeader;

  constructor() {
    const params: ElementParams = {
      tag: TagName.DIV,
      classNames: [TableCss.TABLE],
      textContent: '',
    };

    super(params);

    this.tableHeader = new TableHeader(
      () => console.log('sortID'),
      () => console.log('sortWins'),
      () => console.log('sortTime')
    );
  }
}
