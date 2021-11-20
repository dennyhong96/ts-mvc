import { inject } from "inversify-props";
import { ControllerBase } from "./controllerBase";
import { TodoModel } from "@/models/TodoModel";
import { MyApp } from "..";
import { QueryParams } from "@/router/router";
import { ViewTodo } from "@/views/viewTodo";
import { ITodo } from "@/types/interfaces/ITodo";

export class ControllerTodo extends ControllerBase {
  @inject("ViewTodo") private todoView!: ViewTodo;
  @inject() private todoModel!: TodoModel;

  params: QueryParams = {};
  todo: ITodo | undefined;

  constructor(public app: MyApp) {
    super(app);

    this.todoView.registerContainer(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    this.params = params;
    console.log({ params });
    const todo = this.todoModel.findTodo(params.todoId);
    this.todo = todo;
    if (todo) {
      this.renderPage();
    }
  }

  protected renderPage(): void {
    this.render(
      this.pageContainer,
      this.todoView.render({
        data: { todo: this.todo as ITodo },
      }),
    );
  }

  deleteTodo(todoId: string): void {
    this.todoModel.deleteTodo(todoId);
    this.renderPage();
  }

  toggleTodo(todoId: string): void {
    this.todoModel.toggleTodo(todoId);
    this.renderPage();
  }
}
