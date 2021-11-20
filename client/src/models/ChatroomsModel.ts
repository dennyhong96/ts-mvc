import { inject, injectable } from "inversify-props";

import { Model } from "@/models/Model";
import { IChatroomsState } from "@/types/interfaces/IChatroomState";
import { IModel } from "@/types/interfaces/models/IModel";
import { IChatroomsRepository } from "@/types/interfaces/services/repositories/IChatroomsRepository";

export const initialChatroomState: IChatroomsState = {
  chatrooms: [],
};

@injectable()
export class ChatroomsModel extends Model<IChatroomsState> implements IModel<IChatroomsState> {
  @inject() private chatroomsRepository!: IChatroomsRepository;

  constructor() {
    super({ ...initialChatroomState });
  }

  async loadChatrooms(): Promise<void> {
    const chatrooms = await this.chatroomsRepository.get();
    this.state.chatrooms = chatrooms;
  }

  async enterChatroom(chatroomId: string): Promise<void> {
    await this.chatroomsRepository.post(chatroomId);
  }
}
