import { injectable } from "inversify-props";

import { View } from "@/views/View";
import { IChat } from "@/types/interfaces/IChat";

import styles from "@/styles/ChatsView.module.scss";
import { Utils } from "@/utils/Utils";

@injectable()
export class ChatsListView extends View {
  public domTree: HTMLElement | null = null;

  public scrollToBottom(): void {
    if (!this.domTree) return;
    const list = this.domTree.querySelector("ul");
    if (!list || list.offsetTop > this.domTree.offsetTop) return;
    this.domTree.querySelector("li:last-of-type")?.scrollIntoView();
  }

  public render(props: { chats: IChat[]; username: string }): HTMLElement {
    const { chats, username } = props;

    const domTree = (
      <div className={styles.chatsList}>
        <ul>
          {chats.map((c) => {
            return (
              <li
                className={this.cx(styles.chatMessage, {
                  [styles.myMessage]: c.username === username,
                })}
                data-chat-id={c.id}
              >
                <div>
                  <p>{c.message}</p>
                  {c.username !== username ? (
                    <div>{Utils.generateAvatarText(c.username)}</div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
    this.domTree = domTree;
    return domTree;
  }
}
