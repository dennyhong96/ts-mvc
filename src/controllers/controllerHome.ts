import { inject } from "inversify-props";
import { ControllerBase } from "./controllerBase";
import { Utils } from "@/utils/Utils";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoModel } from "@/models/TodoModel";
import { ViewHome } from "@/views/viewHome";
import { MyApp } from "..";

export class ControllerHome extends ControllerBase {
  @inject() private todosRepository!: ITodosRepository;
  @inject() private todoModel!: TodoModel;

  homeView: ViewHome;

  constructor(public app: MyApp) {
    super(app);

    this.homeView = new ViewHome(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    const [todos] = await Utils.try(this.todosRepository.get());
    if (todos) {
      this.todoModel.setTodos(todos);
      this.renderPage();
    }
  }

  protected renderPage(): void {
    this.render(
      this.pageContainer,
      this.homeView.render({
        data: this.todoModel.state,
        onDeleteTodo: this.deleteTodo.bind(this),
        onToggleTodo: this.toggleTodo.bind(this),
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
