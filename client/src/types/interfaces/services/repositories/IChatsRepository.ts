import { IChat } from "@/types/interfaces/IChat";

export interface IChatsRepository {
  get(chatroomId: string): Promise<IChat[]>;
  post(chatPayload: IChat): Promise<void>;
}
