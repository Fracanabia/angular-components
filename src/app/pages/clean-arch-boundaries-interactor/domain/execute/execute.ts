export abstract class Execute<T> {
  abstract execute(...args: any[]): T;
}
