import h from "hyperscript";
import classnames from "classnames";
import { IView } from "@/types/interfaces/views/IView";
import { injectable } from "inversify-props";

@injectable()
export class View implements IView {
  public container: HTMLElement | null = null;
  public registerContainer(container: HTMLElement): void {
    this.container = container;
  }
  public cx = classnames;
  public render(_props: any): HTMLElement {
    // Overwrite
    return <div />;
  }
}
