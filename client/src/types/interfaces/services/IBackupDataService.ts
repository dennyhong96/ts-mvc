import { IController } from "@/types/interfaces/controllers/IController";

export interface IBackupDataService {
  save<T extends Record<string, any>>(
    controllerInstance: IController,
    data: T,
    onSave?: (data: T) => void,
  ): void;
  restore<T extends Record<string, any>>(
    controllerInstance: IController,
    data: T,
    onRestore?: (data: T) => void,
  ): void;
}
