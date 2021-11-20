import { injectable } from "inversify-props";

import { View } from "@/views/View";
import { IChat } from "@/types/interfaces/IChat";

@injectable()
export class ChatsListView extends View {
  public render(props: { chats: IChat[] }): HTMLElement {
    const { chats } = props;
    return (
      <div>
        <ul style="height:300px;overflow-y:auto;">
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
      </div>
    );
  }
}
