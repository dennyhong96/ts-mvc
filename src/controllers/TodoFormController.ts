import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { TodoFormView } from "@/views/TodoFormView";
import { Controller } from "@/controllers/Controller";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { Utils } from "@/utils/Utils";
import { inject } from "inversify-props";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { ITodo } from "@/types/interfaces/ITodo";

export class TodoFormController extends Controller<ITodoState, TodoFormView> {
  @inject() private todosRepository!: ITodosRepository;

  constructor(public model: Model<ITodoState>, public formView: TodoFormView) {
    super(model, formView);
  }

  @autoBind
  handler(container: HTMLElement): void {
    for (const key in container) {
      if (/^on/.test(key)) {
        const eventType = key.substr(2);
        switch (eventType) {
          case "submit": {
            container.addEventListener(eventType, this.handleSubmit);
            break;
          }
          default:
            break;
        }
      }
    }
  }

  @autoBind
  async handleSubmit(evt: Event): Promise<void> {
    evt.stopPropagation();
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    if (form) {
      const input = form.querySelector("input")!;
      const newTodo: ITodo = await this.todosRepository.post({
        id: Utils.generateId("td"),
        title: input.value,
        completed: false,
      });
      this.model.setState({
        todos: [newTodo, ...this.model.state.todos],
      });
      input.value = "";
      this.formView.focusInput();
    }
  }
}
