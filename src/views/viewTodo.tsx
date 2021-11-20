import { ITodo } from "@/types/interfaces/ITodo";
import { View } from "@/views/View";
import { injectable } from "inversify-props";

@injectable()
export class ViewTodo extends View {
  public render(props: {
    data: {
      todo: ITodo;
    };
  }): HTMLElement {
    const { data } = props;
    return <h1>{data.todo.title}</h1>;
  }
}
