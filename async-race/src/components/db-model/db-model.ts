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

export type WinnerStatus = { id: number; wins: number; time: number };

export type RaceParams = { velocity: number; distance: number };

export default class DbModel {
  private static storage = new DbModel();

  private readonly BASE_PATH = 'http://127.0.0.1:3000';

  private readonly GARAGE_PATH = 'garage';

  private readonly ENGINE_PATH = 'engine';

  static getInstance() {
    return this.storage;
  }

  async getWinners(callback: (winners: Array<WinnerStatus>) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
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

  async getCar(carId: number, callback: (car: CarInfo) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carId}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  async addCar(carInfo: CarInfo, callback: (car: CarInfo) => void) {
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
