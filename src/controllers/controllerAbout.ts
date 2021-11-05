import { QueryParams } from "@/router/router";
import { ViewAbout } from "@/views/viewAbout";
import { MyApp } from "..";
import { ControllerBase } from "./controllerBase";

export class ControllerAbout extends ControllerBase {
  constructor(public app: MyApp) {
    super(app);
  }

  // @ts-ignore
  protected loadPage(params: QueryParams): void {
    const about = new ViewAbout(this.pageContainer);
    this.pageContainer.insertAdjacentElement("afterbegin", about.render());
  }
}
