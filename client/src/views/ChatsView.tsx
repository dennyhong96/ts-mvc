import { injectable } from "inversify-props";

import { View } from "@/views/View";

import styles from "@/styles/ChatsView.module.scss";

@injectable()
export class ChatsView extends View {
  public listSlot = (<div className={styles.chatsContainer}></div>);
  public formSlot = (<div></div>);
  public render(): HTMLElement {
    return (
      <div className={styles.chats}>
        {this.listSlot}
        {this.formSlot}
      </div>
    );
  }
}
