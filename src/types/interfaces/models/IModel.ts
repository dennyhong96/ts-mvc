export interface IModel<T> {
  state: T;
  setState(newState: T): void;
  registerSubscriber(...subscribers: ((state: T) => void)[]): void;
}
