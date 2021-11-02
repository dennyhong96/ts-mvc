import { ITodo } from "../../ITodo";

export interface ITodosRepository {
  get(): Promise<ITodo[]>;
  put(todos: ITodo[]): Promise<void>;
}
