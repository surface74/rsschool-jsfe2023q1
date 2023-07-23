import StorageKey, { CurrentPage } from '../../enums/storage-key';

export default class Storage {
  static GetCurrentPage(): CurrentPage {
    const result = localStorage.getItem(StorageKey.CURRENT_PAGE) || CurrentPage.GARAGE;

    return result === CurrentPage.GARAGE ? CurrentPage.GARAGE : CurrentPage.WINNERS;
  }

  static GetGaragePage(): number {
    const result: string | null = localStorage.getItem(StorageKey.GARAGE_PAGE);

    return result ? Number(result) : 0;
  }

  static SaveGaragePage(garagePage: number): void {
    localStorage.setItem(StorageKey.GARAGE_PAGE, String(garagePage));
  }

  static GetWinnersPage(): number {
    const result: string | null = localStorage.getItem(StorageKey.WINNERS_PAGE);

    return result ? Number(result) : 0;
  }

  static SaveWinnersPage(winnersPage: number): void {
    localStorage.setItem(StorageKey.WINNERS_PAGE, String(winnersPage));
  }
}
