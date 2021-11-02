import { IView } from "@/types/interfaces/views/IView";
import { View } from "@/views/View";

export class TodoPageView extends View<any> implements IView<any> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public generateMarkup(): string {
    return `
    <div id="form"></div>
    <div id="todo"></div>
    `;
  }
}
