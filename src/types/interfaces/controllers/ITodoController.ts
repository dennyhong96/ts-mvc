import { IController } from "./IController";

export interface ITodoController extends IController {
  init(): Promise<void>;
  handleClick(evt: MouseEvent): Promise<void>;
}
