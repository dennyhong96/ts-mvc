import { QueryParams } from "@/router/router";
import { ViewBase } from "@/views/viewBase";
import { MyApp } from "..";
import { Controller } from "./controller";

/**
 * This is the base class for all controllers in this app.
 * Here we render parts common to all pages, and handle events in those parts.
 */
export class ControllerBase extends Controller {
  // private masterPage: MasterPage;
  protected pageContainer!: HTMLElement;

  constructor(public app: MyApp) {
    super();
  }

  public load(params: QueryParams): void {
    super.load(params);
    const appRootElement = this.app.getAppBody();
    const base = new ViewBase(appRootElement);
    this.render(appRootElement, base.render());
    this.pageContainer = appRootElement.querySelector(".page-container") as HTMLElement;
    this.loadPage(params);
  }

  // @ts-ignore
  protected loadPage(params: QueryParams): void {
    // Overwrite
  }
}
