import { injectable } from "inversify-props";

import { IChat } from "@/models/ChatsModel";
import { View } from "@/views/View";

@injectable()
export class ChatsView extends View {
  public render(props: {
    chats: IChat[];
    postChatsMesssage(message: string): Promise<void>;
  }): HTMLElement {
    const { chats, postChatsMesssage } = props;

    const textarea = <textarea name="chat" id="chat" cols="30" rows="10"></textarea>;

    const handleSubmit = (evt: Event) => {
      evt.preventDefault();
      postChatsMesssage(textarea.value);
      textarea.value = "";
    };

    return (
      <div>
        <ul>
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
        <form onsubmit={handleSubmit}>
          <div>{textarea}</div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
