import { IModel } from "../models/IModel";
import { IView } from "../views/IView";

export interface IController {
  model: IModel<any>;
  view: IView<any>;
  handler(container: HTMLElement): void;
}
