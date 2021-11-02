import axios from "axios";
import { injectable } from "inversify-props";

import { ITodo } from "@/types/interfaces/ITodo";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { Utils } from "@/utils/Utils";

@injectable()
export class TodosRepository implements ITodosRepository {
  private URL = "https://jsonplaceholder.typicode.com/todos";
  public async get(): Promise<ITodo[]> {
    const res = await axios.get(this.URL);
    return res.data.map((td: ITodo) => ({ ...td, id: Utils.generateId("td") }));
  }
}
