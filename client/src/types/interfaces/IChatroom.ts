import { IAuthState } from "./IAuthState";

export interface IChatroom {
  id: string;
  name: string;
  onlineCount: number;
  onlineUsers: IAuthState[];
}
