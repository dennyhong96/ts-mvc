import { inject } from "inversify-props";

import { Controller } from "@/controllers/Controller";
import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoView } from "@/views/TodoView";

export class TodoController extends Controller<ITodoState, TodoView> {
  @inject() private todosRepository!: ITodosRepository;

  constructor(public model: Model<ITodoState>, public todoView: TodoView) {
    super(model, todoView);
    this.init();
  }

  async init(): Promise<void> {
    const todos = await this.todosRepository.get();
    this.model.setState({ todos });
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
  async handleClick(evt: MouseEvent): Promise<void> {
    if ((evt.target as HTMLElement).tagName === "LI") {
      const todoId = (evt.target as HTMLElement).dataset.todoId;
      const todos = this.model.state.todos.map((td) =>
        td.id === todoId ? { ...td, completed: !td.completed } : td,
      );
      await this.todosRepository.put(todos);
      this.model.setState({ todos });
    } else if ((evt.target as HTMLElement).tagName === "BUTTON") {
      const todo = (evt.target as HTMLElement).closest("li")!;
      const todoId = todo.dataset.todoId;
      const todos = this.model.state.todos.filter((td) => td.id !== todoId);
      await this.todosRepository.put(todos);
      this.model.setState({ todos });
    }
  }
}
