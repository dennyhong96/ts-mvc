import { Model } from "@/models/Model";
import { ITodoState } from "@/types/interfaces/ITodoState";
import { IModel } from "@/types/interfaces/models/IModel";

export const initialTodoState: ITodoState = {
  todos: [],
};

export class TodoModel extends Model<ITodoState> implements IModel<ITodoState> {
  constructor(initialTodoState: ITodoState) {
    super(initialTodoState);
  }
}
