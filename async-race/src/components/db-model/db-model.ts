import { CarInfo } from '../car/car';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

enum Endpoint {
  GARAGE = 'garage',
  ENGINE = 'engine',
  WINNERS = 'winners',
}

enum CarStatus {
  STARTED = 'started',
  DRIVE = 'drive',
  STOPPED = 'stopped',
}

export enum WinnersSortField {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export enum WinnersSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type WinnerInfo = { id: number; wins: number; time: number };

export type RaceParams = { velocity: number; distance: number };

export default class DbModel {
  private static storage = new DbModel();

  private readonly BASE_PATH = 'http://127.0.0.1:3000';

  private readonly GARAGE_PATH = 'garage';

  private readonly ENGINE_PATH = 'engine';

  private readonly CARS_PER_PAGE = 7;

  private readonly WINNERS_PER_PAGE = 10;

  static getInstance() {
    return this.storage;
  }

  async getWinners(callback: (winners: Array<WinnerInfo>) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async getWinnersOnPage(
    callback: (winners: Array<WinnerInfo>, totalItem: number) => void,
    pageNumber: number,
    sortField: WinnersSortField,
    sortOrder: WinnersSortOrder,
    itemPerPage: number = this.WINNERS_PER_PAGE
  ) {
    const query = `_page=${pageNumber}&_limit=${itemPerPage}&_sort=${sortField}&_order=${sortOrder}`;
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}?${query}`;
    const method = { method: HttpMethod.GET };

    let totalItem = 0;
    await fetch(path, method)
      .then((result) => {
        totalItem = Number(result.headers.get('X-Total-Count') || 0);
        return result.json();
      })
      .then((result) => callback(result, totalItem))
      .catch((error: Error) => console.error(error));
  }

  async getWinner(carId: number, callback: (car: WinnerInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}/${carId}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async createWinner(winnerInfo: WinnerInfo, callback: (winnerInfo: WinnerInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}`;
    const method = HttpMethod.POST;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      id: winnerInfo.id,
      wins: winnerInfo.wins,
      time: winnerInfo.time,
    });

    await fetch(path, { method, headers, body })
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async deleteWinner(carId: number, callback: () => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}/${carId}`;
    const method = { method: HttpMethod.DELETE };

    await fetch(path, method)
      .then((result) => result.json())
      .then(() => callback())
      .catch((error: Error) => console.error(error));
  }

  async updateWinner(winnerInfo: WinnerInfo, callback: (winnerInfo: WinnerInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}/${winnerInfo.id}`;
    const method = HttpMethod.PUT;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      time: winnerInfo.time,
      wins: winnerInfo.wins,
    });

    await fetch(path, { method, headers, body })
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async getCars(callback: (cars: Array<CarInfo>) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async getCarsOnPage(
    callback: (cars: Array<CarInfo>, totalCars: number) => void,
    pageNumber: number,
    itemPerPage: number = this.CARS_PER_PAGE
  ) {
    const query = `_page=${pageNumber}&_limit=${itemPerPage}`;
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}?${query}`;
    const method = { method: HttpMethod.GET };

    let totalItem = 0;
    await fetch(path, method)
      .then((result) => {
        totalItem = Number(result.headers.get('X-Total-Count') || 0);
        return result.json();
      })
      .then((result) => callback(result, totalItem))
      .catch((error: Error) => console.error(error));
  }

  async getCar(carId: number, callback: (car: CarInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carId}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async createCar(carInfo: CarInfo, callback: (car: CarInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}`;
    const method = HttpMethod.POST;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      name: carInfo.name,
      color: carInfo.color,
    });

    await fetch(path, { method, headers, body })
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async deleteCar(carId: number, callback: (carId: number) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carId}`;
    const method = { method: HttpMethod.DELETE };

    await fetch(path, method)
      .then((result) => result.json())
      .then(() => callback(carId))
      .catch((error: Error) => console.error(error));
  }

  async updateCar(carInfo: CarInfo, callback: (car: CarInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carInfo.id}`;
    const method = HttpMethod.PUT;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      name: carInfo.name,
      color: carInfo.color,
    });

    await fetch(path, { method, headers, body })
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async startCar(carId: number, callback: (raceParams: RaceParams) => void) {
    const query = `id=${carId}&status=${CarStatus.STARTED}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    await fetch(path, { method, headers })
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async driveCar(carId: number, callbackOK: (carId: number) => void, callbackError: (carId: number) => void) {
    const query = `id=${carId}&status=${CarStatus.DRIVE}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    await fetch(path, { method, headers })
      .then((result) => (result.ok ? callbackOK(carId) : callbackError(carId)))
      .catch((error: Error) => console.error(error));
  }

  async stopCar(carId: number, callback: (raceParams: RaceParams) => void) {
    const query = `id=${carId}&status=${CarStatus.STOPPED}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    await fetch(path, { method, headers })
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }
}
