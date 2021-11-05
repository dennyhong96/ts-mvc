import { IModel } from "@/types/interfaces/models/IModel";

export class Model<T extends { [key: string | symbol]: any }> implements IModel<T> {
  public state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }
}
