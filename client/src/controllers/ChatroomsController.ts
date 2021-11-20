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

    this.test();
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    this.renderPage();
    this.pubsub.subscribe(ChatroomsModel.name, this.renderPage.bind(this));
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
    this.pubsub.publish(ChatroomsModel.name);
  }

  public async joinChatroom(chatroomId: string): Promise<void> {
    await this.chatroomsModel.enterChatroom(chatroomId);
    this.app.navigate(`/chats/${chatroomId}`);
  }

  test(): void {
    const eventSource = new EventSource("http://localhost:8000/chatrooms/sse");
    eventSource.addEventListener("message", async (evt) => {
      console.log(evt.data);
      // this.chatsModel.setChats(JSON.parse(evt.data));
      // this.pubsub.publish(ChatsModel.name);
      await this.chatroomsModel.loadChatrooms();
      this.pubsub.publish(ChatroomsModel.name);
    });
  }
}
