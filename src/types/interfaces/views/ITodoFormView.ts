import { IView } from "./IView";

export interface ITodoFormView<T> extends IView<T> {
  focusInput(): void;
  clearInput(): void;
}
