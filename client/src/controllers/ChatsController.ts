import { inject } from "inversify-props";
import { ControllerBase } from "./BaseController";
import { MyApp } from "..";
import { ChatsView } from "@/views/ChatsView";
import { ChatsModel } from "@/models/ChatsModel";
import { ChatsFormView } from "@/views/ChatsFormView";
import { ChatsListView } from "@/views/ChatsListView";

export class ChatsController extends ControllerBase {
  @inject() private chatsView!: ChatsView;
  @inject() private chatsFormView!: ChatsFormView;
  @inject() private chatsListView!: ChatsListView;
  @inject() private chatsModel!: ChatsModel;

  constructor(public app: MyApp) {
    super(app);

    this.chatsView.registerContainer(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    this.renderPage();
    this.pubsub.subscribe(ChatsModel.name, this.renderChatsList.bind(this));
    // await this.loadChats();

    this.test();
  }

  protected renderPage(): void {
    this.renderChats();
    this.renderChatsList();
    this.renderForm();
  }

  protected renderChats() {
    this.render(this.pageContainer, this.chatsView.render());
  }

  protected renderChatsList() {
    this.render(
      this.chatsView.listSlot,
      this.chatsListView.render({
        chats: this.chatsModel.state.chats,
      }),
    );
  }

  protected renderForm() {
    this.render(
      this.chatsView.formSlot,
      this.chatsFormView.render({
        postChatsMesssage: this.postChatsMesssage.bind(this),
      }),
    );
  }

  public async loadChats(): Promise<void> {
    await this.chatsModel.loadChats(this.routeParams.chatroomId);
    this.pubsub.publish(ChatsModel.name);
  }

  public async postChatsMesssage(message: string): Promise<void> {
    await this.chatsModel.postChatsMesssage({
      message,
      chatroomId: this.routeParams.chatroomId,
    });
    this.pubsub.publish(ChatsModel.name);
  }

  test(): void {
    const eventSource = new EventSource(
      `http://localhost:8000/chats/sse/${this.routeParams.chatroomId}`,
    );
    eventSource.addEventListener("message", async (evt) => {
      console.log(evt.data);
      // this.chatsModel.setChats(JSON.parse(evt.data));
      // this.pubsub.publish(ChatsModel.name);
      await this.chatsModel.loadChats(this.routeParams.chatroomId);
      this.pubsub.publish(ChatsModel.name);
    });
  }
}
