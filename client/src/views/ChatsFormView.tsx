import { injectable } from "inversify-props";

import { View } from "@/views/View";

@injectable()
export class ChatsFormView extends View {
  public render(props: { postChatsMesssage(message: string): Promise<void> }): HTMLElement {
    const { postChatsMesssage } = props;

    const textarea = <textarea name="chat" id="chat" cols="30" rows="10"></textarea>;

    const handleSubmit = (evt: Event) => {
      evt.preventDefault();
      postChatsMesssage(textarea.value);
      textarea.value = "";
    };

    return (
      <form onsubmit={handleSubmit}>
        <div>{textarea}</div>
        <button>Submit</button>
      </form>
    );
  }
}
