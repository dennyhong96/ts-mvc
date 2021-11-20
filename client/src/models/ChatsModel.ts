import { inject, injectable } from "inversify-props";

import { Model } from "@/models/Model";
import { AuthModel } from "@/models/AuthModel";
import { Utils } from "@/utils/Utils";
import { IModel } from "@/types/interfaces/models/IModel";
import { IChat } from "@/types/interfaces/IChat";
import { IChatsState } from "@/types/interfaces/IChatState";
import { IChatsRepository } from "@/types/interfaces/services/repositories/IChatsRepository";

export const initialChatsState: IChatsState = {
  chats: [],
};

@injectable()
export class ChatsModel extends Model<IChatsState> implements IModel<IChatsState> {
  @inject() private authModel!: AuthModel;
  @inject() private chatsRepository!: IChatsRepository;

  constructor() {
    super({ ...initialChatsState });
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
    await this.chatsRepository.post(newChat);
  }

  async loadChats(chatroomId: string): Promise<void> {
    const chats = await this.chatsRepository.get(chatroomId);
    this.state.chats = chats;
  }
}
