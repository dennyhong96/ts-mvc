import { AuthModel } from "@/models/AuthModel";
import { QueryParams } from "@/router/router";
import { IPubSubService } from "@/types/interfaces/services/IPubSubService";
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
  @inject() pubSubService!: IPubSubService;
  public pubsub = this.pubSubService;

  // public pubsub = new PubSubService();
  public routeParams: QueryParams = {};

  // private masterPage: MasterPage;
  protected pageContainer!: HTMLElement;

  constructor(public app: MyApp) {
    super();
  }

  public load(params: QueryParams): void {
    super.load(params);
    this.routeParams = params;
    this.renderBase();
    this.pubsub.subscribe(AuthModel.name, this.renderBase);
    this.loadPage(params);
  }

  public unload(): void {
    this.pubsub.clean(AuthModel.name, this.renderBase);
    super.unload();
  }

  public renderBase = (() => {
    const appRootElement = this.app.getAppBody();
    this.render(
      appRootElement,
      this.baseView.render({
        username: this.authModel.state.username,
        logout: this.logout.bind(this),
      }),
    );
    this.pageContainer = appRootElement.querySelector(".page-container") as HTMLElement;
  }).bind(this);

  public login(username: string): void {
    this.authModel.login(username);
    this.pubsub.publish(AuthModel.name);
    this.app.getRouter().navigate("/chats");
  }

  public logout(): void {
    this.authModel.logout();
    this.pubsub.publish(AuthModel.name);
    this.app.getRouter().navigate("/");
  }

  // @ts-ignore
  protected loadPage(params: QueryParams): void {
    // Overwrite
  }
}
