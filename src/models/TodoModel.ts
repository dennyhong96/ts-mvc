import { Model } from "@/models/Model";
import { ITodoState } from "@/types/interfaces/ITodoState";

export const initialTodoState: ITodoState = {
  todos: [],
};

export class TodoModel extends Model<ITodoState> {
  constructor(initialTodoState: ITodoState) {
    super(initialTodoState);
  }
}
