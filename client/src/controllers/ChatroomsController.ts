import { inject } from "inversify-props";
import { ControllerBase } from "@/controllers/BaseController";
import { MyApp } from "..";
import { ChatroomsModel } from "@/models/ChatroomsModel";
import { ChatroomsView } from "@/views/ChatroomsView";
import { ISSEService } from "@/types/interfaces/services/ISSEService";
import { QueryParams } from "@/router/router";

export class ChatroomsController extends ControllerBase {
  @inject() private SSEService!: ISSEService;
  @inject() private chatroomsModel!: ChatroomsModel;
  @inject() private chatroomsView!: ChatroomsView;

  constructor(public app: MyApp) {
    super(app);

    this.chatroomsView.registerContainer(this.pageContainer);
  }

  protected async loadPage(_params: QueryParams): Promise<void> {
    if (!this.authModel.state.userId) {
      this.app.getRouter().navigate("/");
      return;
    }
    this.renderPage();
    this.pubsub.subscribe(ChatroomsModel.name, this.renderPage);
    this.SSEService.registerEventsource(`${process.env.API_URL}/chatrooms/sse`, this.loadChatrooms);
  }

  public unload(): void {
    this.pubsub.clean(ChatroomsModel.name, this.renderPage);
    this.SSEService.closeEventSource(`${process.env.API_URL}/chatrooms/sse`);
    super.unload();
  }

  protected renderPage = (() => {
    this.render(
      this.pageContainer,
      this.chatroomsView.render({
        chatrooms: this.chatroomsModel.state.chatrooms,
        joinChatroom: this.joinChatroom.bind(this),
      }),
    );
  }).bind(this);

  public loadChatrooms = (async () => {
    await this.chatroomsModel.loadChatrooms();
    this.pubsub.publish(ChatroomsModel.name);
  }).bind(this);

  public async joinChatroom(chatroomId: string): Promise<void> {
    await this.chatroomsModel.enterChatroom(chatroomId);
    this.app.navigate(`/chats/${chatroomId}`);
  }
}
