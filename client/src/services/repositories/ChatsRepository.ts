import axios from "axios";

import { IChat } from "@/types/interfaces/IChat";
import { IChatsRepository } from "@/types/interfaces/services/repositories/IChatsRepository";

const ENDPOINT_URL = `${process.env.API_URL}/chats`;

export class ChatsRepository implements IChatsRepository {
  async get(chatroomId: string): Promise<IChat[]> {
    const { data } = await axios.get(`${ENDPOINT_URL}/${chatroomId}`);
    return data as IChat[];
  }

  async post(chatPayload: IChat): Promise<void> {
    return axios.post(`${ENDPOINT_URL}`, chatPayload);
  }
}
