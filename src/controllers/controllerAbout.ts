import { QueryParams } from "@/router/router";
import { ViewAbout } from "@/views/viewAbout";
import { inject } from "inversify-props";
import { MyApp } from "..";
import { ControllerBase } from "./controllerBase";

export class ControllerAbout extends ControllerBase {
  @inject("ViewAbout") aboutView!: ViewAbout;

  constructor(public app: MyApp) {
    super(app);
  }

  // @ts-ignore
  protected loadPage(params: QueryParams): void {
    this.aboutView.registerContainer(this.pageContainer);
    this.pageContainer.insertAdjacentElement("afterbegin", this.aboutView.render());
  }
}
