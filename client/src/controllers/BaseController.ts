import { inject } from "inversify-props";
import { MyApp } from "..";
import { QueryParams } from "@/router/router";
import { AuthModel } from "@/models/AuthModel";
import { Controller } from "@/controllers/Controller";
import { IPubSubService } from "@/types/interfaces/services/IPubSubService";
import { BaseView } from "@/views/BaseView";
import { ChatroomsModel } from "@/models/ChatroomsModel";
import { ISSEService } from "@/types/interfaces/services/ISSEService";

/**
 * This is the viewBase class for all controllers in this app.
 * Here we render parts common to all pages, and handle events in those parts.
 */
export class ControllerBase extends Controller {
  @inject() pubSubService!: IPubSubService;
  @inject() authModel!: AuthModel;
  @inject() baseView!: BaseView;
  @inject() chatroomsModel!: ChatroomsModel;
  @inject() SSEService!: ISSEService;

  public routeParams: QueryParams = {};
  public pubsub = this.pubSubService;

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
    this.pubsub.subscribe(ChatroomsModel.name, this.renderBase);
    this.SSEService.registerEventsource(`${process.env.API_URL}/chatrooms/sse`, this.loadChatrooms);
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
        user: this.authModel.state,
        logout: this.logout.bind(this),
        users:
          this.chatroomsModel.state.chatrooms.find((cr) => cr.id === this.routeParams.chatroomId)
            ?.onlineUsers ?? [],
      }),
    );
    this.pageContainer = this.baseView.pageContainer;
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

  public loadChatrooms = (async () => {
    await this.chatroomsModel.loadChatrooms();
    this.pubsub.publish(ChatroomsModel.name);
  }).bind(this);

  protected loadPage(_params: QueryParams): void {
    // Overwrite
  }
}
