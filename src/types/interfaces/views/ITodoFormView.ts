import { IView } from "./IView";

export interface ITodoFormView extends IView {
  focusInput(): void;
  clearInput(): void;
}
