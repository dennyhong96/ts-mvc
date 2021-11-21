import { injectable } from "inversify-props";

import { View } from "@/views/View";

import chatsIcon from "@/assets/icons/chat.svg";
import styles from "@/styles/ChatsView.module.scss";

@injectable()
export class ChatsFormView extends View {
  public render(props: { postChatsMesssage(message: string): Promise<void> }): HTMLElement {
    const { postChatsMesssage } = props;
    const textarea = (
      <textarea
        name="chat"
        id="chat"
        onkeydown={(evt: KeyboardEvent) => {
          if (evt.key !== "Enter") return;
          handleSubmit(evt);
        }}
      ></textarea>
    );
    const handleSubmit = (evt: Event) => {
      evt.preventDefault();
      postChatsMesssage(textarea.value);
      textarea.value = "";
    };
    return (
      <form className={styles.chatsForm} onsubmit={handleSubmit}>
        {textarea}
        <button>
          <img src={chatsIcon} alt="send" />
        </button>
      </form>
    );
  }
}
