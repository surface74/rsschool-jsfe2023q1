export default class MyMath {
  public static getRandom(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
}
