import { inject } from "inversify-props";
import { ControllerBase } from "./controllerBase";
import { Utils } from "@/utils/Utils";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoModel } from "@/models/TodoModel";
import { ViewHome } from "@/views/viewHome";
import { MyApp } from "..";
import { ConfirmationModalView } from "@/views/ConfirmationModalView";

export class ControllerHome extends ControllerBase {
  @inject("ViewHome") private homeView!: ViewHome;
  @inject() private confirmationModalView!: ConfirmationModalView;

  @inject() private todosRepository!: ITodosRepository;
  @inject() private todoModel!: TodoModel;

  constructor(public app: MyApp) {
    super(app);

    console.log(this.homeView);
    this.homeView.registerContainer(this.pageContainer);
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
        onOpenModal: this.openModal.bind(this),
      }),
    );
    this.render(
      this.pageContainer.querySelector(".modal-container")!,
      this.confirmationModalView.render({
        show: this.todoModel.state.showModal,
        closeModal: this.closeModal.bind(this),
      }),
    );
  }

  openModal(): void {
    this.todoModel.openModal();
    this.renderPage();
  }

  closeModal(): void {
    this.todoModel.closeModal();
    this.renderPage();
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
