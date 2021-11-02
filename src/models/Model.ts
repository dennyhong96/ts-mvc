export class Model<T extends { [key: string | symbol]: any }> {
  private _state: T;
  private _subscribers: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this._state = initialState;
  }

  public registerSubscriber(...subscribers: ((state: T) => void)[]): void {
    subscribers.forEach((sub) => this._subscribers.push(sub));
  }

  public get state(): T {
    return this._state;
  }

  public setState(newState: T): void {
    this._state = newState;
    this.publishUpdate();
  }

  private publishUpdate(): void {
    if (!this._state) return;
    this._subscribers.forEach((sub) => sub(this._state as T));
  }

  // private proxyHandler: ProxyHandler<T> = {
  //   get: (target, key) => {
  //     if (typeof target[key] === "object" && target[key] !== null) {
  //       return new Proxy(target[key], this.proxyHandler);
  //     } else {
  //       return target[key];
  //     }
  //   },
  //   set: (target, key, value) => {
  //     // @ts-ignore
  //     target[key] = value;
  //     this.publishUpdate();
  //     return true;
  //   },
  // };
}
