import { ITodo } from "../../ITodo";

export interface ITodosRepository {
  get(): Promise<ITodo[]>;
  post(newTodo: ITodo): Promise<ITodo>;
  put(todos: ITodo[]): Promise<void>;
}
