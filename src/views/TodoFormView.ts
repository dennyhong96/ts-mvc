import { ITodoState } from "@/types/interfaces/ITodoState";
import { ITodoFormView } from "@/types/interfaces/views/ITodoFormView";
import { View } from "@/views/View";

export class TodoFormView extends View<ITodoState> implements ITodoFormView<ITodoState> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public get inputEl(): HTMLInputElement {
    return this.container.querySelector("input")!;
  }

  public focusInput(): void {
    this.inputEl.focus();
  }

  public clearInput(): void {
    this.inputEl.value = "";
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
