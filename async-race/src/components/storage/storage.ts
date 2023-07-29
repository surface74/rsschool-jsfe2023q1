import StorageKey, { CurrentPageKey } from '../../enums/storage-key';

export default class Storage {
  static readonly FIRST_PAGE = 1;

  static GetCurrentPage(): CurrentPageKey {
    const result = localStorage.getItem(StorageKey.CURRENT_PAGE) || '';

    return result === String(CurrentPageKey.WINNERS) ? CurrentPageKey.WINNERS : CurrentPageKey.GARAGE;
  }

  static SaveCurrentPage(currentPage: CurrentPageKey): void {
    localStorage.setItem(StorageKey.CURRENT_PAGE, String(currentPage));
  }

  static GetGaragePage(): number {
    const result: string | null = localStorage.getItem(StorageKey.GARAGE_PAGE);

    return result ? Number(result) : Storage.FIRST_PAGE;
  }

  static SaveGaragePage(garagePage: number): void {
    localStorage.setItem(StorageKey.GARAGE_PAGE, String(garagePage));
  }

  static GetWinnersPage(): number {
    const result: string | null = localStorage.getItem(StorageKey.WINNERS_PAGE);

    return result ? Number(result) : Storage.FIRST_PAGE;
  }

  static SaveWinnersPage(winnersPage: number): void {
    localStorage.setItem(StorageKey.WINNERS_PAGE, String(winnersPage));
  }

  static SaveSortConfig(orderConfig: string): void {
    localStorage.setItem(StorageKey.SORT_CONFIG, orderConfig);
  }

  static GetSortConfig(): string {
    const result: string | null = localStorage.getItem(StorageKey.SORT_CONFIG);

    return result || '';
  }
}
