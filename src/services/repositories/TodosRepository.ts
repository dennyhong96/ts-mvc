import { ITodo } from "@/types/interfaces/ITodo";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import axios from "axios";
import { injectable } from "inversify-props";

@injectable()
export class TodosRepository implements ITodosRepository {
  private URL = "https://jsonplaceholder.typicode.com/todos";

  public async get(): Promise<ITodo[]> {
    const res = await axios.get(this.URL);
    return res.data;
  }
}
