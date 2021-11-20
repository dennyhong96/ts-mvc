import { AuthModel } from "@/models/AuthModel";
import { QueryParams } from "@/router/router";
import { PubSubService } from "@/services/PubSubService";
import { BaseView } from "@/views/BaseView";
import { inject } from "inversify-props";
import { MyApp } from "..";
import { Controller } from "./Controller";

/**
 * This is the viewBase class for all controllers in this app.
 * Here we render parts common to all pages, and handle events in those parts.
 */
export class ControllerBase extends Controller {
  @inject() baseView!: BaseView;
  @inject() authModel!: AuthModel;

  public pubsub = new PubSubService();
  public params: QueryParams = {};

  // private masterPage: MasterPage;
  protected pageContainer!: HTMLElement;

  constructor(public app: MyApp) {
    super();
  }

  public load(params: QueryParams): void {
    console.log("load called");
    super.load(params);
    this.params = params;
    this.renderBase();
    this.pubsub.subscribe(this.renderBase.bind(this));
    this.loadPage(params);
  }

  public renderBase(): void {
    const appRootElement = this.app.getAppBody();
    this.render(
      appRootElement,
      this.baseView.render({
        username: this.authModel.state.username,
        logout: this.logout.bind(this),
      }),
    );
    this.pageContainer = appRootElement.querySelector(".page-container") as HTMLElement;
  }

  public login(username: string): void {
    this.authModel.login(username);
    this.pubsub.publish();
    this.app.getRouter().navigate("/chats");
  }

  public logout(): void {
    this.authModel.logout();
    this.pubsub.publish();
    this.app.getRouter().navigate("/");
  }

  // @ts-ignore
  protected loadPage(params: QueryParams): void {
    // Overwrite
  }
}
