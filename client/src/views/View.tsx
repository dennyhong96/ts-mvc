import { injectable } from "inversify-props";
import classnames from "classnames";

import { IView } from "@/types/interfaces/views/IView";

@injectable()
export class View implements IView {
  public container: HTMLElement | null = null;
  public registerContainer(container: HTMLElement): void {
    this.container = container;
  }
  public cx = classnames;
  public render(_props: any): HTMLElement {
    return <div />;
  }
}
