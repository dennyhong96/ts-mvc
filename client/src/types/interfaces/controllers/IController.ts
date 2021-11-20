import { IModel } from "@/types/interfaces/models/IModel";
import { IView } from "@/types/interfaces/views/IView";

export interface IController {
  model: IModel<any>;
  view: IView;
  handlers: { [key: string]: (container: HTMLElement) => void };
}
