import { IModel } from "../models/IModel";
import { IView } from "../views/IView";

export interface IController {
  model: IModel<any>;
  view: IView;
  handlers: { [key: string]: (container: HTMLElement) => void };
}
