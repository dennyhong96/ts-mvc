import h from "hyperscript";
import classnames from "classnames";
import { IView } from "@/types/interfaces/views/IView";

export class View<T> implements IView<T> {
  constructor(public container: HTMLElement) {}
  public cx = classnames;
  public render(_data: T): HTMLElement {
    return h("div");
  }
}
