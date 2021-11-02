import { autoBind } from "@/decorators/autoBind";
import { IState } from "@/models/TodoModel";
import { View } from "@/views/View";

import styles from "@/styles/TodoView.module.scss";

export class TodoView extends View<IState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  @autoBind
  public generateMarkup(data: IState): string {
    return `
    <ul>
    ${data.todos
      .map(
        (td) =>
          `<li data-id="${td.name}" class="${td.completed ? styles.completed : ""}">${
            td.name
          }</li>`,
      )
      .join("")}
    </ul>
    `;
  }
}
