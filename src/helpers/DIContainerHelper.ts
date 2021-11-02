import { TodosRepository } from "@/services/repositories/TodosRepository";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { container } from "inversify-props";

export class DIContainerHelper {
  public static buildDIContainer(): void {
    container.addSingleton<ITodosRepository>(TodosRepository);
  }
}
