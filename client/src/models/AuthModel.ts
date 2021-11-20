import { Model } from "@/models/Model";
import { IAuthState } from "@/types/interfaces/IAuthState";
import { IModel } from "@/types/interfaces/models/IModel";
import { Utils } from "@/utils/Utils";
import { injectable } from "inversify-props";

export const initialAuthState: IAuthState = {
  username: "",
  userId: "",
};

@injectable()
export class AuthModel extends Model<IAuthState> implements IModel<IAuthState> {
  constructor() {
    super({ ...initialAuthState });

    // @ts-ignore
    window.authModel = this;
  }

  public login(username: string): void {
    this.state.username = username;
    this.state.userId = Utils.generateId("u");
  }

  public logout(): void {
    this.state = initialAuthState;
  }
}
