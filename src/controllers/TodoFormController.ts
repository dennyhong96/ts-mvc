import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { TodoFormView } from "@/views/TodoFormView";
import { Controller } from "@/controllers/Controller";
import { ITodoState } from "@/types/interfaces/ITodoState";

export class TodoFormController extends Controller<ITodoState, TodoFormView> {
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
  handleSubmit(evt: Event): void {
    evt.stopPropagation();
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    if (form) {
      const input = form.querySelector("input")!;
      this.model.state.todos.push({
        id: "_" + Math.random().toString(36).substr(2, 9),
        title: input.value,
        completed: false,
      });
      input.value = "";
      this.formView.focusInput();
    }
  }
}
