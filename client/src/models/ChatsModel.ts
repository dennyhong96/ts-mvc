import { Model } from "@/models/Model";
import { IModel } from "@/types/interfaces/models/IModel";
import { IChat } from "@/types/interfaces/services/IChat";
import { IChatsState } from "@/types/interfaces/services/IChatState";
import { Utils } from "@/utils/Utils";
import axios from "axios";
import { inject, injectable } from "inversify-props";
import { AuthModel } from "./AuthModel";

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
    const newChat: IChat = {
      chatroomId: payload.chatroomId,
      message: payload.message,
      id: Utils.generateId("c"),
      userId: this.authModel.state.userId,
      username: this.authModel.state.username,
      createdOn: new Date().toISOString(),
    };
    await axios.post(`${process.env.API_URL}/chats`, newChat);
    // this.state.chats.push(newChat);
  }

  async loadChats(chatroomId: string): Promise<void> {
    const { data } = await axios.get(`${process.env.API_URL}/chats/${chatroomId}`);
    this.state.chats = data as IChat[];

    // this.state.chats = [
    //   {
    //     id: Utils.generateId("c"),
    //     userId: Utils.generateId("u"),
    //     username: "Denny",
    //     chatroomId: `cr-1`,
    //     message: "Hello, this is a chat message.",
    //     createdOn: new Date().toISOString(),
    //   },
    //   {
    //     id: Utils.generateId("c"),
    //     userId: Utils.generateId("u"),
    //     username: "Denny",
    //     chatroomId: `cr-1`,
    //     message: "Hello, this is a chat message.",
    //     createdOn: new Date().toISOString(),
    //   },
    //   {
    //     id: Utils.generateId("c"),
    //     userId: Utils.generateId("u"),
    //     username: "Denny",
    //     chatroomId: `cr-1`,
    //     message: "Hello, this is a chat message.",
    //     createdOn: new Date().toISOString(),
    //   },
    // ];
  }

  setChats(chats: IChat[]): void {
    this.state.chats = chats;
  }
}
