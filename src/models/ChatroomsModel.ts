import { Model } from "@/models/Model";
import { IModel } from "@/types/interfaces/models/IModel";
import { Utils } from "@/utils/Utils";
import { injectable } from "inversify-props";

export interface IChatroom {
  id: string;
  name: string;
  onlineCount: number;
}

interface IChatsState {
  chatrooms: IChatroom[];
}

export const initialChatroomState: { chatrooms: IChatroom[] } = {
  chatrooms: [],
};

@injectable()
export class ChatroomsModel extends Model<IChatsState> implements IModel<IChatsState> {
  constructor() {
    super({ ...initialChatroomState });

    // @ts-ignore
    window.chatroomsModel = this;
  }

  async loadChatrooms(): Promise<void> {
    await Utils.sleep();
    this.state.chatrooms = [
      {
        id: `cr-1`,
        name: "Chatroom 1",
        onlineCount: 0,
      },
      {
        id: `cr-2`,
        name: "Chatroom 2",
        onlineCount: 0,
      },
    ];
  }
}
