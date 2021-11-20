import { injectable } from "inversify-props";

import { View } from "@/views/View";
import { IChatroom } from "@/models/ChatroomsModel";

@injectable()
export class ChatroomsView extends View {
  public render(props: {
    chatrooms: IChatroom[];
    joinChatroom: (chatroomId: string) => void;
  }): HTMLElement {
    const { chatrooms, joinChatroom } = props;
    return (
      <ul>
        {chatrooms.map((cr) => {
          return (
            <li data-chatroom-id={cr.id}>
              <p>{cr.name}</p>
              <p>{cr.onlineCount} online</p>
              <button onclick={() => joinChatroom(cr.id)}>Enter</button>
            </li>
          );
        })}
      </ul>
    );
  }
}
