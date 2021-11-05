import classnames from "classnames";

export interface IView<T> {
  container: HTMLElement;
  cx: typeof classnames;
  render(data: T): HTMLElement;
}
