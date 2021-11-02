import { ITodoState } from "@/types/interfaces/ITodoState";
import { ITodoFormView } from "@/types/interfaces/views/ITodoFormView";
import { View } from "@/views/View";

export class TodoFormView extends View<ITodoState> implements ITodoFormView<ITodoState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public focusInput(): void {
    this.container.querySelector("input")!.focus();
  }

  public clearInput(): void {
    this.container.querySelector("input")!.value = "";
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
