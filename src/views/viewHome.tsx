import { ITodoState } from "@/types/interfaces/ITodoState";
import { View } from "@/views/View";
import { injectable } from "inversify-props";

import styles from "../styles/TodoView.module.scss";

@injectable()
export class ViewHome extends View {
  public render(props: {
    data: ITodoState;
    onDeleteTodo: (todoId: string) => void;
    onToggleTodo: (todoId: string) => void;
    onOpenModal: () => void;
  }): HTMLElement {
    const { data, onDeleteTodo, onToggleTodo, onOpenModal } = props;
    return (
      <div>
        <button onclick={onOpenModal}>Open Modal</button>
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
        <div className="modal-container"></div>
      </div>
    );
  }
}
