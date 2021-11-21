import { injectable } from "inversify-props";

import { View } from "@/views/View";

import styles from "@/styles/HomeView.module.scss";

@injectable()
export class HomeView extends View {
  public render(props: { login: (username: string) => void }): HTMLElement {
    const { login } = props;
    const input: HTMLInputElement = (
      <input
        className={this.cx(styles.input)}
        id="username-input"
        name="username-input"
        type="text"
        placeholder="John Doe"
      />
    );
    const onSubmit = (evt: Event) => {
      evt.preventDefault();
      login(input.value);
      input.value = "";
    };
    return (
      <div className={this.cx(styles.formWrapper)}>
        <form className={this.cx(styles.form)} onsubmit={onSubmit}>
          <label htmlFor="username-input">Username</label>
          {input}
          <button className={this.cx(styles.button)}>Login</button>
        </form>
      </div>
    );
  }
}
