import { View } from "@/views/View";

export class TodoPageView extends View<any> {
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
