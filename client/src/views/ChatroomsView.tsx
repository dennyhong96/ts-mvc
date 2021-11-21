import { injectable } from "inversify-props";

import { View } from "@/views/View";
import { IChatroom } from "@/types/interfaces/IChatroom";

import usersIcon from "@/assets/icons/users.svg";
import plusIcon from "@/assets/icons/plus.svg";
import styles from "@/styles/ChatroomsView.module.scss";

@injectable()
export class ChatroomsView extends View {
  public render(props: {
    chatrooms: IChatroom[];
    joinChatroom: (chatroomId: string) => void;
  }): HTMLElement {
    const { chatrooms, joinChatroom } = props;
    return (
      <ul className={this.cx(styles.chatroomList)}>
        {chatrooms.map((cr) => {
          return (
            <li data-chatroom-id={cr.id}>
              <div>
                <h3>{cr.name}</h3>
                <p>
                  {cr.onlineCount} <img src={usersIcon} alt="users" />{" "}
                </p>
              </div>
              <button onclick={() => joinChatroom(cr.id)}>
                <img src={plusIcon} alt="join" />
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
