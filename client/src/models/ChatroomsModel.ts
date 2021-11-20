import { Model } from "@/models/Model";
import { IModel } from "@/types/interfaces/models/IModel";
import { IChatroom } from "@/types/interfaces/services/IChatroom";
import { IChatroomsState } from "@/types/interfaces/services/IChatroomState";
import axios from "axios";
import { injectable } from "inversify-props";

export const initialChatroomState: IChatroomsState = {
  chatrooms: [],
};

@injectable()
export class ChatroomsModel extends Model<IChatroomsState> implements IModel<IChatroomsState> {
  constructor() {
    super({ ...initialChatroomState });
  }

  async loadChatrooms(): Promise<void> {
    const { data } = await axios.get(`${process.env.API_URL}/chatrooms`);
    this.state.chatrooms = data as IChatroom[];
    // this.state.chatrooms = [
    //   {
    //     id: `cr-1`,
    //     name: "Chatroom 1",
    //     onlineCount: 0,
    //   },
    //   {
    //     id: `cr-2`,
    //     name: "Chatroom 2",
    //     onlineCount: 0,
    //   },
    // ];
  }

  async enterChatroom(chatroomId: string): Promise<void> {
    await axios.post(`${process.env.API_URL}/chatrooms/${chatroomId}`);
  }
}
