import { IChatroom } from "@/types/interfaces/IChatroom";

export interface IChatroomsRepository {
  get(): Promise<IChatroom[]>;
  post(chatroomId: string): Promise<void>;
}
