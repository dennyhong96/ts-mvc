import { IView } from "./IView";

export interface ITodoView<T> extends IView<T> {
  handlers: {
    handleToggleTodo: (todoId: string) => void;
  };
}
