import { View } from "@/views/View";
import { ITodoState } from "@/types/interfaces/ITodoState";

import styles from "@/styles/TodoView.module.scss";

export class TodoView extends View<ITodoState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public generateMarkup(data: ITodoState): string {
    return `
    <ul>
    ${data.todos
      .map(
        (td) =>
          `<li data-id="${td.id}" class="${td.completed ? styles.completed : ""}">${td.title}</li>`,
      )
      .join("")}
    </ul>
    `;
  }
}
