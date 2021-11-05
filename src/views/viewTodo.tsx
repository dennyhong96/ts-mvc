import { ITodo } from "@/types/interfaces/ITodo";
import { View } from "@/views/View";

export class ViewTodo extends View<any> {
  constructor(public container: HTMLElement) {
    super(container);
  }

  public render(props: {
    data: {
      todo: ITodo;
    };
  }): HTMLElement {
    const { data } = props;
    return <h1>{data.todo.title}</h1>;
  }
}
