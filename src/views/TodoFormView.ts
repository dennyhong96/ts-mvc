import { ITodoState } from "@/types/interfaces/ITodoState";
import { View } from "@/views/View";

export class TodoFormView extends View<ITodoState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public focusInput(): void {
    this.container.querySelector("input")?.focus();
  }

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
