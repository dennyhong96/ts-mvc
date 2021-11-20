import { inject } from "inversify-props";
import { ControllerBase } from "./BaseController";
import { MyApp } from "..";
import { ChatroomsView } from "@/views/ChatroomsView";
import { ChatroomsModel } from "@/models/ChatroomsModel";

export class ChatroomsController extends ControllerBase {
  @inject() private chatroomsView!: ChatroomsView;
  @inject() private chatroomsModel!: ChatroomsModel;

  constructor(public app: MyApp) {
    super(app);

    this.chatroomsView.registerContainer(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    this.renderPage();
    this.pubsub.subscribe(this.renderPage.bind(this));
    await this.loadChatrooms();
  }

  protected renderPage(): void {
    this.render(
      this.pageContainer,
      this.chatroomsView.render({
        chatrooms: this.chatroomsModel.state.chatrooms,
        joinChatroom: this.joinChatroom.bind(this),
      }),
    );
  }

  public async loadChatrooms(): Promise<void> {
    await this.chatroomsModel.loadChatrooms();
    this.pubsub.publish();
  }

  public joinChatroom(chatroomId: string): void {
    this.app.navigate(`/chats/${chatroomId}`);
  }
}
