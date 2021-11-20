import { Model } from "@/models/Model";
import { IModel } from "@/types/interfaces/models/IModel";
import { Utils } from "@/utils/Utils";
import { inject, injectable } from "inversify-props";
import { AuthModel } from "./AuthModel";

export interface IChat {
  id: string;
  userId: string;
  username: string;
  message: string;
  chatroomId: string;
  createdOn: string;
}

interface IChatsState {
  chats: IChat[];
}

export const initialChatsState: IChatsState = {
  chats: [],
};

@injectable()
export class ChatsModel extends Model<IChatsState> implements IModel<IChatsState> {
  @inject() private authModel!: AuthModel;

  constructor() {
    super({ ...initialChatsState });

    // @ts-ignore
    window.chatroomsModel = this;
  }

  async postChatsMesssage(payload: Pick<IChat, "message" | "chatroomId">): Promise<void> {
    await Utils.sleep();
    this.state.chats.push({
      chatroomId: payload.chatroomId,
      message: payload.message,
      id: Utils.generateId("c"),
      userId: this.authModel.state.userId,
      username: this.authModel.state.username,
      createdOn: new Date().toISOString(),
    });
  }

  async loadChats(): Promise<void> {
    await Utils.sleep();
    this.state.chats = [
      {
        id: Utils.generateId("c"),
        userId: Utils.generateId("u"),
        username: "Denny",
        chatroomId: `cr-1`,
        message: "Hello, this is a chat message.",
        createdOn: new Date().toISOString(),
      },
      {
        id: Utils.generateId("c"),
        userId: Utils.generateId("u"),
        username: "Denny",
        chatroomId: `cr-1`,
        message: "Hello, this is a chat message.",
        createdOn: new Date().toISOString(),
      },
      {
        id: Utils.generateId("c"),
        userId: Utils.generateId("u"),
        username: "Denny",
        chatroomId: `cr-1`,
        message: "Hello, this is a chat message.",
        createdOn: new Date().toISOString(),
      },
    ];
  }
}
