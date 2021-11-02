import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { TodoFormView } from "@/views/TodoFormView";
import { Controller } from "@/controllers/Controller";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { Utils } from "@/utils/Utils";
import { inject } from "inversify-props";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { ITodoFormController } from "@/types/interfaces/controllers/ITodoFormController";

export class TodoFormController
  extends Controller<ITodoState, TodoFormView>
  implements ITodoFormController
{
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

    this.saveBackup();

    const form = evt.target! as HTMLFormElement;
    const input = form.querySelector("input")!;

    const title = input.value;

    const todo = {
      id: Utils.generateId("td"),
      title,
      completed: false,
    };

    // Optimistic update
    this.model.setState({
      todos: [todo, ...this.model.state.todos],
    });

    // Network request, might fail
    const [newTodo] = await Utils.try(
      this.todosRepository.post({
        id: Utils.generateId("td"),
        title: input.value,
        completed: false,
      }),
    );

    if (!newTodo) {
      this.restoreBakcup();
      this.formView.inputEl.value = title;
    } else {
      this.saveBackup();
    }

    this.formView.focusInput();
  }
}
