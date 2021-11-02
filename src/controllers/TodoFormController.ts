import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { IState } from "@/models/TodoModel";
import { TodoFormView } from "@/views/TodoFormView";
import { Controller } from "@/controllers/Controller";

export class TodoFormController extends Controller<IState, TodoFormView> {
  constructor(public model: Model<IState>, public formView: TodoFormView) {
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
        name: input.value,
        completed: false,
      });
      input.value = "";
      this.formView.focusInput();
    }
  }
}
