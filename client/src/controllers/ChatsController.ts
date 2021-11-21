import { inject } from "inversify-props";
import { MyApp } from "..";
import { QueryParams } from "@/router/router";
import { ChatsModel } from "@/models/ChatsModel";
import { ControllerBase } from "@/controllers/BaseController";
import { ChatsView } from "@/views/ChatsView";
import { ChatsFormView } from "@/views/ChatsFormView";
import { ChatsListView } from "@/views/ChatsListView";

export class ChatsController extends ControllerBase {
  @inject() private chatsModel!: ChatsModel;
  @inject() private chatsView!: ChatsView;
  @inject() private chatsFormView!: ChatsFormView;
  @inject() private chatsListView!: ChatsListView;

  constructor(public app: MyApp) {
    super(app);

    this.chatsView.registerContainer(this.pageContainer);
  }

  protected async loadPage(_params: QueryParams): Promise<void> {
    // Route guard
    if (!this.authModel.state.userId) {
      this.app.getRouter().navigate("/");
      return;
    }
    this.renderPage();
    this.pubsub.subscribe(ChatsModel.name, this.renderChatsList);
    this.SSEService.registerEventsource(
      `${process.env.API_URL}/chats/sse/${this.routeParams.chatroomId}`,
      this.loadChats,
    );
  }

  public unload(): void {
    this.pubsub.clean(ChatsModel.name, this.renderChatsList);
    this.SSEService.closeEventSource(
      `${process.env.API_URL}/chats/sse/${this.routeParams.chatroomId}`,
    );
    super.unload();
  }

  protected renderPage(): void {
    this.renderChats();
    this.renderChatsList();
    this.renderForm();
  }

  protected renderChats(): void {
    this.render(this.pageContainer, this.chatsView.render());
  }

  protected renderChatsList = (() => {
    this.render(
      this.chatsView.listSlot,
      this.chatsListView.render({
        chats: this.chatsModel.state.chats,
        username: this.authModel.state.username,
      }),
    );
    this.chatsListView.scrollToBottom();
  }).bind(this);

  protected renderForm(): void {
    this.render(
      this.chatsView.formSlot,
      this.chatsFormView.render({
        postChatsMesssage: this.postChatsMesssage.bind(this),
      }),
    );
  }

  public loadChats = (async () => {
    await this.chatsModel.loadChats(this.routeParams.chatroomId);
    this.pubsub.publish(ChatsModel.name);
  }).bind(this);

  public async postChatsMesssage(message: string): Promise<void> {
    await this.chatsModel.postChatsMesssage({
      message,
      chatroomId: this.routeParams.chatroomId,
    });
    // this.pubsub.publish(ChatsModel.name);
  }
}
