import StorageKey, { CurrentPageKey } from '../../enums/storage-key';

export default class Storage {
  static GetCurrentPage(): CurrentPageKey {
    const result = localStorage.getItem(StorageKey.CURRENT_PAGE);

    return result === '1' ? CurrentPageKey.WINNERS : CurrentPageKey.GARAGE;
  }

  static SaveCurrentPage(currentPage: CurrentPageKey): void {
    localStorage.setItem(StorageKey.CURRENT_PAGE, String(currentPage));
  }

  static GetGaragePage(): number {
    const result: string | null = localStorage.getItem(StorageKey.GARAGE_PAGE);

    return result ? Number(result) : 1;
  }

  static SaveGaragePage(garagePage: number): void {
    localStorage.setItem(StorageKey.GARAGE_PAGE, String(garagePage));
  }

  static GetWinnersPage(): number {
    const result: string | null = localStorage.getItem(StorageKey.WINNERS_PAGE);

    return result ? Number(result) : 1;
  }

  static SaveWinnersPage(winnersPage: number): void {
    localStorage.setItem(StorageKey.WINNERS_PAGE, String(winnersPage));
  }
}
