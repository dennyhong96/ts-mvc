import axios from "axios";

import { IChatroom } from "@/types/interfaces/IChatroom";
import { IChatroomsRepository } from "@/types/interfaces/services/repositories/IChatroomsRepository";
import { IAuthState } from "@/types/interfaces/IAuthState";

const ENDPOINT_URL = `${process.env.API_URL}/chatrooms`;

export class ChatroomsRepository implements IChatroomsRepository {
  async get(): Promise<IChatroom[]> {
    const { data } = await axios.get(`${ENDPOINT_URL}`);
    return data as IChatroom[];
  }

  async post(chatroomId: string, user: IAuthState): Promise<void> {
    return axios.post(`${ENDPOINT_URL}/${chatroomId}`, user);
  }
}
