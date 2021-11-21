import { injectable } from "inversify-props";

import { View } from "@/views/View";
import { IChat } from "@/types/interfaces/IChat";

import styles from "@/styles/ChatsView.module.scss";

@injectable()
export class ChatsListView extends View {
  public render(props: { chats: IChat[] }): HTMLElement {
    const { chats } = props;
    return (
      <ul className={styles.chatsList}>
        {chats.map((c) => {
          return (
            <li data-chat-id={c.id}>
              <small>
                {c.username} - ${c.createdOn}
              </small>
              <p>{c.message}</p>
            </li>
          );
        })}
      </ul>
    );
  }
}
