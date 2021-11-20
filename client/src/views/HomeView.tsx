import { injectable } from "inversify-props";

import { View } from "@/views/View";

@injectable()
export class HomeView extends View {
  public render(props: { login: (username: string) => void }): HTMLElement {
    // @ts-ignore
    const { login } = props;

    const input = <input type="text" />;

    const onSubmit = (evt: Event) => {
      evt.preventDefault();
      login(input.value);
      input.value = "";
    };

    return (
      <form onsubmit={onSubmit}>
        <label>
          name
          {input}
        </label>
        <button>Login</button>
      </form>
    );
  }
}
