import { IView } from "./IView";

export interface ITodoView extends IView {
  handlers: {
    handleToggleTodo: (todoId: string) => void;
  };
}
