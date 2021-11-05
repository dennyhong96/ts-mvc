// @ts-nocheck
import { View } from "@/views/View";
import { ITodoState } from "@/types/interfaces/ITodoState";

import styles from "@/styles/TodoView.module.scss";

export class TodoView extends View<ITodoState> implements View<ITodoState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public render(data: ITodoState): HTMLElement {
    return (
      <ul>
        {data.todos.map((td) => {
          return (
            <li class={this.cx(styles.item, { [styles.completed]: td.completed })}>
              {td.title}
              <button>x</button>
            </li>
          );
        })}
      </ul>
    );
  }
}
