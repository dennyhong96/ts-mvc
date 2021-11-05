export interface IView<T> {
  handlers: { [key: string]: (...args: any[]) => void };
  attachHandler(handlers: { [key: string]: (...args: any[]) => void }): void;
  render(data: T): void;
  clear(): void;
}
