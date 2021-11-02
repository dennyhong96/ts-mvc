import { Model } from "@/models/Model";

export interface ITodo {
  name: string;
  completed: boolean;
}

export interface IState {
  todos: ITodo[];
}

export const todoModel = new Model<IState>({
  todos: [],
});
