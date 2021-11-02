export class Model<T extends { [key: string | symbol]: any }> {
  public state: T;
  private _subscribers: ((state: T) => void)[] = [];

  constructor(initialState: T) {
    this.state = new Proxy<T>(initialState, this.handleProxy());
  }

  public registerSubscriber(...subscribers: ((state: T) => void)[]): void {
    subscribers.forEach((sub) => this._subscribers.push(sub));
  }

  private handleProxy() {
    const proxyHandler: ProxyHandler<T> = {
      get: (target, key) => {
        if (typeof target[key] === "object" && target[key] !== null) {
          return new Proxy(target[key], this.handleProxy());
        } else {
          return target[key];
        }
      },
      set: (target, key, value) => {
        // @ts-ignore
        target[key] = value;
        this.publishUpdate();
        return true;
      },
    };
    return proxyHandler;
  }

  private publishUpdate(): void {
    this._subscribers.forEach((sub) => sub(this.state));
  }
}
