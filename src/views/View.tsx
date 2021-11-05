// @ts-nocheck
import { autoBind } from "@/decorators/autoBind";
import { IView } from "@/types/interfaces/views/IView";
import classnames from "classnames";

export class View<T> implements IView<T> {
  public handlers: { [key: string]: (container: HTMLElement) => void } = {};

  constructor(public container: HTMLElement) {}

  public attachHandler(handlers: { [key: string]: (container: HTMLElement) => void }): void {
    this.handlers = handlers;
  }

  public cx = classnames;

  @autoBind
  public mountElement(data: T): void {
    this.clear();
    const element = this.render(data);
    this.container.insertAdjacentElement("afterbegin", element);
  }

  public clear(): void {
    this.container.innerHTML = "";
  }

  public render(_data: T): HTMLElement {
    return <div></div>;
  }
}
