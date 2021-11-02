import { autoBind } from "@/decorators/autoBind";
import { Model } from "@/models/Model";
import { TodoFormView } from "@/views/TodoFormView";
import { Controller } from "@/controllers/Controller";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { Utils } from "@/utils/Utils";

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
      this.model.setState({
        todos: [
          {
            id: Utils.generateId("td"),
            title: input.value,
            completed: false,
          },
          ...this.model.state.todos,
        ],
      });
      input.value = "";
      this.formView.focusInput();
    }
  }
}
