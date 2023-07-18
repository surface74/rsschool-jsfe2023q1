import StorageKey from '../../enums/storage-key';

export default class Storage {
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
