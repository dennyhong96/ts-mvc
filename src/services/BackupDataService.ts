import cloneDeep from "lodash.clonedeep";

import { IBackupDataService } from "@/types/interfaces/services/IBackupDataService";
import { IController } from "@/types/interfaces/controllers/IController";
import { injectable } from "inversify-props";

@injectable()
export class BackupDataService implements IBackupDataService {
  public save<T extends Record<string, any>>(
    controllerInstance: IController,
    data: T,
    onSave?: (data: T) => void,
  ): void {
    const _backup = cloneDeep(data);
    Object.assign(controllerInstance, { _backup });
    onSave?.(controllerInstance.model.state);
  }

  public restore<T extends Record<string, any>>(
    controllerInstance: IController,
    data: T,
    onRestore?: (data: T) => void,
  ): void {
    const _backup = cloneDeep((controllerInstance as IController & { _backup: T })._backup);
    Object.assign(data, _backup);
    onRestore?.(controllerInstance.model.state);
  }
}
