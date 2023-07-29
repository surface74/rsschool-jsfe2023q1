import Car, { CarInfo } from '../car/car';

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

  public async getWinners(callback: (winners: Array<WinnerInfo>) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  public async getWinnersOnPage(
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

  public async getWinner(car: Car, callback: (car: Car, winnerInfo: WinnerInfo, time: number) => void, time: number) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}/${car.getCarId()}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(car, result, time))
      .catch((error: Error) => console.error(error));
  }

  public async createWinner(winnerInfo: WinnerInfo): Promise<void> {
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
      .catch((error: Error) => console.error(error));
  }

  public async deleteWinner(carId: number) {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}/${carId}`;
    const method = { method: HttpMethod.DELETE };

    await fetch(path, method)
      .then((result) => result.json())
      .catch((error: Error) => console.error(error));
  }

  public async updateWinner(winnerInfo: WinnerInfo): Promise<void> {
    const path = `${this.BASE_PATH}/${Endpoint.WINNERS}/${winnerInfo.id}`;
    const method = HttpMethod.PUT;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      time: winnerInfo.time,
      wins: winnerInfo.wins,
    });

    await fetch(path, { method, headers, body })
      .then((result) => result.json())
      .catch((error: Error) => console.error(error));
  }

  public async getCars(callback: (cars: Array<CarInfo>) => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  public async getCarsOnPage(
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

  public async getCar(carId: number, callback: (car: CarInfo) => void): Promise<void> {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carId}`;
    const method = { method: HttpMethod.GET };

    await fetch(path, method)
      .then((result) => result.json())
      .then((result) => callback(result))
      .catch((error: Error) => console.error(error));
  }

  public async getCarSilent(carId: number): Promise<CarInfo> {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carId}`;
    const method = { method: HttpMethod.GET };

    const response = await fetch(path, method);
    const data = (await response.json()) as Promise<CarInfo>;

    return data;
  }

  public async getCarsByWinnerInfo(winnerInfos: WinnerInfo[], callback: (carInfos: CarInfo[]) => void) {
    const promises: Promise<CarInfo>[] = [];
    winnerInfos.forEach((winnerInfo) => promises.push(this.getCarSilent(winnerInfo.id)));

    const carInfos = await Promise.all(promises);

    callback(carInfos);
  }

  public async createCar(carInfo: CarInfo, callback: (car: CarInfo) => void) {
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

  public async createCarSilent(carInfo: CarInfo) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}`;
    const method = HttpMethod.POST;
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
      name: carInfo.name,
      color: carInfo.color,
    });

    await fetch(path, { method, headers, body })
      .then((result) => result.json())
      .catch((error: Error) => console.error(error));
  }

  public async createCars(carNumber: number, callback: () => void) {
    const promises: Promise<void>[] = [];
    for (let i = 0; i < carNumber; i += 1) {
      const carInfo: CarInfo = Car.getRandomCarInfo();
      promises.push(this.createCarSilent(carInfo));
    }
    await Promise.all(promises);

    callback();
  }

  public async deleteCar(carId: number, callback: () => void) {
    const path = `${this.BASE_PATH}/${Endpoint.GARAGE}/${carId}`;
    const method = { method: HttpMethod.DELETE };

    await fetch(path, method)
      .then((result) => result.json())
      .then(() => callback())
      .catch((error: Error) => console.error(error));
  }

  public async updateCar(carInfo: CarInfo, callback: (car: CarInfo) => void) {
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

  public async startEngine(car: Car, callback: (raceParams: RaceParams, car: Car) => void) {
    const carId = car.getCarId();
    const query = `id=${carId}&status=${CarStatus.STARTED}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    await fetch(path, { method, headers })
      .then((result) => result.json())
      .then((result) => callback(result, car))
      .catch((error: Error) => console.error(error));
  }

  public async startEngineSilent(car: Car): Promise<RaceParams> {
    const carId = car.getCarId();
    const query = `id=${carId}&status=${CarStatus.STARTED}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    const response = await fetch(path, { method, headers });
    const data = (await response.json()) as Promise<RaceParams>;
    return data;
  }

  public async driveCar(
    car: Car,
    callbackOK: (car: Car, time: number) => void,
    callbackError: () => void,
    time: number
  ): Promise<Car> {
    const carId = car.getCarId();
    const query = `id=${carId}&status=${CarStatus.DRIVE}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    await fetch(path, { method, headers })
      .then((result) => (result.ok ? callbackOK(car, time) : callbackError()))
      .catch((error: Error) => console.error(error));

    return car;
  }

  public async stopCar(carId: number) {
    const query = `id=${carId}&status=${CarStatus.STOPPED}`;
    const path = `${this.BASE_PATH}/${Endpoint.ENGINE}?${query}`;
    const method = HttpMethod.PATCH;
    const headers = {
      'Content-Type': 'application/json',
      charset: 'UTF-8',
    };

    await fetch(path, { method, headers })
      .then((result) => result.json())
      .catch((error: Error) => console.error(error));
  }
}
