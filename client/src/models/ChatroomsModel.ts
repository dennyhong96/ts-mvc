import { Model } from "@/models/Model";
import { IModel } from "@/types/interfaces/models/IModel";
import { IChatroomsState } from "@/types/interfaces/services/IChatroomState";
import { Utils } from "@/utils/Utils";
import { injectable } from "inversify-props";

export const initialChatroomState: IChatroomsState = {
  chatrooms: [],
};

@injectable()
export class ChatroomsModel extends Model<IChatroomsState> implements IModel<IChatroomsState> {
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
