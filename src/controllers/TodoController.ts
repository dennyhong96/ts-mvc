import { inject } from "inversify-props";

import { Controller } from "@/controllers/Controller";
import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoView } from "@/views/TodoView";
import { ITodoController } from "@/types/interfaces/controllers/ITodoController";
import { Utils } from "@/utils/Utils";

export class TodoController extends Controller<ITodoState, TodoView> implements ITodoController {
  @inject() private todosRepository!: ITodosRepository;

  constructor(public model: Model<ITodoState>, public todoView: TodoView) {
    super(model, todoView);
    this.init();
  }

  async init(): Promise<void> {
    const [todos] = await Utils.try(this.todosRepository.get());
    if (!todos) return this.restoreBakcup();
    this.model.setState({ todos });
    this.saveBackup();
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
    evt.stopPropagation();
    evt.preventDefault();
    if ((evt.target as HTMLElement).tagName === "LI") {
      this.saveBackup();

      const todoId = (evt.target as HTMLElement).dataset.todoId;
      const todos = this.model.state.todos.map((td) =>
        td.id === todoId ? { ...td, completed: !td.completed } : td,
      );
      const [savedTodos] = await Utils.try(this.todosRepository.put(todos));
      if (!savedTodos) return this.restoreBakcup();

      this.model.setState({ todos: savedTodos });
      this.saveBackup();
    } else if ((evt.target as HTMLElement).tagName === "BUTTON") {
      this.saveBackup();

      const todo = (evt.target as HTMLElement).closest("li")!;
      const todoId = todo.dataset.todoId;
      const todos = this.model.state.todos.filter((td) => td.id !== todoId);
      const [savedTodos] = await Utils.try(this.todosRepository.put(todos));
      if (!savedTodos) return this.restoreBakcup();

      this.model.setState({ todos: savedTodos });
      this.saveBackup();
    }
  }
}
