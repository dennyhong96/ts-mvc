import { autoBind } from "@/decorators/autoBind";
import { IState } from "@/models/TodoModel";
import { View } from "@/views/View";

export class TodoFormView extends View<IState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public focusInput(): void {
    this.container.querySelector("input")?.focus();
  }

  @autoBind
  public generateMarkup(): string {
    return `
    <form>
    <input type="text" />
    <button>Submit</button>
    </form>
    <ul>
    `;
  }
}
