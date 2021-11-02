export interface IView<T> {
  attachHandler(handler: (container: HTMLElement) => void): void;
  render(data: T): void;
  clear(): void;
  generateMarkup(_data: T): string;
}
