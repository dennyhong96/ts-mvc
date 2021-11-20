import classnames from "classnames";

export interface IView {
  container: HTMLElement | null;
  cx: typeof classnames;
  render(_props: any): HTMLElement;
}
