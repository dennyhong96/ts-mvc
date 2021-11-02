import { autoBind } from "@/decorators/autoBind";

export class View<T> {
  constructor(public container: HTMLElement) {}

  public attachHandler(handler: (container: HTMLElement) => void): void {
    handler(this.container);
  }

  @autoBind
  public render(data: T): void {
    this.clear();
    const markup = this.generateMarkup(data);
    this.container.insertAdjacentHTML("beforeend", markup);
  }

  public clear(): void {
    this.container.innerHTML = "";
  }

  public generateMarkup(_data: T): string {
    return ``;
  }

  protected cn(...args: string[]): string {
    return args.join(" ");
  }
}
