import { IController } from "./IController";

export interface ITodoFormController extends IController {
  handleSubmit(evt: Event): Promise<void>;
}
