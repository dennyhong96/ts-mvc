import { Controller } from "@/controllers/Controller";
import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoView } from "@/views/TodoView";
import { inject } from "inversify-props";

export class TodoController extends Controller<ITodoState, TodoView> {
  @inject() private todosRepository!: ITodosRepository;

  constructor(public model: Model<ITodoState>, public todoView: TodoView) {
    super(model, todoView);
    this.init();
  }

  async init(): Promise<void> {
    const todos = await this.todosRepository.get();
    this.model.state.todos = todos;
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
      const todoId = (evt.target as HTMLElement).dataset.id;
      const todo = this.model.state.todos.find((td) => td.id === todoId);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
}
