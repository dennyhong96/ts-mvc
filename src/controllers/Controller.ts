import { Model } from "@/models/Model";
import { IController } from "@/types/interfaces/controllers/IController";
import { IBackupDataService } from "@/types/interfaces/services/IBackupDataService";
import { View } from "@/views/View";
import { inject } from "inversify-props";

export class Controller<S, V extends View<S>> implements IController {
  @inject() public backupDataService!: IBackupDataService;

  constructor(public model: Model<S> = new Model<any>({}), public view: V) {
    view.mountElement(model.state);
    model.registerSubscriber(view.mountElement);
    view.attachHandler(this.handlers);
    this.saveBackup();
  }

  public saveBackup(): void {
    this.backupDataService.save(this, this.model.state);
  }

  public restoreBakcup(): void {
    this.backupDataService.restore(this, this.model.state, this.model.setState);
  }

  public handlers = {};
}
