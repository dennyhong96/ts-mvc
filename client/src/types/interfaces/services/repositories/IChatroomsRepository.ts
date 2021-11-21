import { IChatroom } from "@/types/interfaces/IChatroom";
import { IAuthState } from "@/types/interfaces/IAuthState";

export interface IChatroomsRepository {
  get(): Promise<IChatroom[]>;
  post(chatroomId: string, user: IAuthState): Promise<void>;
}
