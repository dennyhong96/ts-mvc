import { Controller } from "@/controllers/Controller";
import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { TodoView } from "@/views/TodoView";
import { IState } from "@/models/TodoModel";

export class TodoController extends Controller<IState, TodoView> {
  constructor(public model: Model<IState>, public todoView: TodoView) {
    super(model, todoView);
  }

  @autoBind
  handler(container: HTMLElement): void {
    for (const key in container) {
      if (/^on/.test(key)) {
        const eventType = key.substr(2);
        switch (eventType) {
          case "click": {
            container.addEventListener(eventType, this.handleClick);
            break;
          }
          default:
            break;
        }
      }
    }
  }

  @autoBind
  handleClick(evt: MouseEvent): void {
    if ((evt.target as HTMLElement).tagName === "LI") {
      const todoName = (evt.target as HTMLElement).dataset.id;
      const todo = this.model.state.todos.find((td) => td.name === todoName);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
}
