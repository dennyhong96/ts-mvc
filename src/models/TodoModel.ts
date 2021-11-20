import { Model } from "@/models/Model";
import { ITodo } from "@/types/interfaces/ITodo";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { IModel } from "@/types/interfaces/models/IModel";
import { Utils } from "@/utils/Utils";
import { injectable } from "inversify-props";

export const initialTodoState: ITodoState = {
  todos: [],
  showModal: true,
};

@injectable()
export class TodoModel extends Model<ITodoState> implements IModel<ITodoState> {
  constructor() {
    super(initialTodoState);
  }

  public setTodos(todos: ITodo[]): void {
    this.state.todos = todos;
  }

  public toggleTodo(todoId: string): void {
    const todo = this.state.todos.find((td) => td.id === todoId);
    if (!todo) return;
    todo.completed = !todo.completed;
  }

  public addTodo(title: string): void {
    this.state.todos.unshift({ title, id: Utils.generateId(), completed: false });
  }

  public deleteTodo(todoId: string): void {
    const todoIndex = this.state.todos.findIndex((td) => td.id === todoId);
    if (todoIndex < 0) return;
    this.state.todos.splice(todoIndex, 1);
  }

  public findTodo(todoId: string): ITodo | undefined {
    const todo = this.state.todos.find((td) => td.id === todoId);
    return todo;
  }

  public openModal() {
    this.state.showModal = true;
  }

  public closeModal() {
    this.state.showModal = false;
  }
}
