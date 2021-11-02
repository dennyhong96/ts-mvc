import { container } from "inversify-props";
import { BackupDataService } from "@/services/BackupDataService";
import { TodosRepository } from "@/services/repositories/TodosRepository";
import { IBackupDataService } from "@/types/interfaces/services/IBackupDataService";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";

export class DIContainerHelper {
  public static buildDIContainer(): void {
    container.addSingleton<ITodosRepository>(TodosRepository);
    container.addSingleton<IBackupDataService>(BackupDataService);
  }
}
