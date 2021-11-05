import { ITodoState } from "@/types/interfaces/ITodoState";
import { View } from "@/views/View";

import styles from "../styles/TodoView.module.scss";

export class ViewHome extends View<any> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public render(props: {
    data: ITodoState;
    onDeleteTodo: (todoId: string) => void;
    onToggleTodo: (todoId: string) => void;
  }): HTMLElement {
    const { data, onDeleteTodo, onToggleTodo } = props;
    return (
      <ul>
        {data.todos.map((td) => {
          return (
            <li
              className={this.cx(styles.item, { [styles.completed]: td.completed })}
              onclick={() => onToggleTodo(td.id)}
            >
              {td.title}
              <button onclick={() => onDeleteTodo(td.id)}>x</button>
              <a className="appnav" href={`/todos/${td.id}`}>
                =&gt;
              </a>
            </li>
          );
        })}
      </ul>
    );
  }
}
