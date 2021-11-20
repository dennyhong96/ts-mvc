import { inject } from "inversify-props";
import { ControllerBase } from "./BaseController";
import { MyApp } from "..";
import { ChatsView } from "@/views/ChatsView";
import { ChatsModel } from "@/models/ChatsModel";

export class ChatsController extends ControllerBase {
  @inject() private chatsView!: ChatsView;
  @inject() private chatsModel!: ChatsModel;

  constructor(public app: MyApp) {
    super(app);

    this.chatsView.registerContainer(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    this.renderPage();
    this.pubsub.subscribe(ChatsModel.name, this.renderPage.bind(this));
    await this.loadChats();
  }

  protected renderPage(): void {
    this.render(
      this.pageContainer,
      this.chatsView.render({
        chats: this.chatsModel.state.chats,
        postChatsMesssage: this.postChatsMesssage.bind(this),
      }),
    );
  }

  public async loadChats(): Promise<void> {
    await this.chatsModel.loadChats();
    this.pubsub.publish(ChatsModel.name);
  }

  public async postChatsMesssage(message: string): Promise<void> {
    await this.chatsModel.postChatsMesssage({
      message,
      chatroomId: this.routeParams.chatroomId,
    });
    this.pubsub.publish(ChatsModel.name);
  }
}
