import { container } from "inversify-props";
import { BackupDataService } from "@/services/BackupDataService";
import { TodosRepository } from "@/services/repositories/TodosRepository";
import { IBackupDataService } from "@/types/interfaces/services/IBackupDataService";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoModel } from "@/models/TodoModel";

import { ViewAbout } from "@/views/viewAbout";
import { ViewBase } from "@/views/viewBase";
import { ViewHome } from "@/views/viewHome";
import { ViewTodo } from "@/views/viewTodo";
import { View } from "@/views/View";
import { ModalView } from "@/views/ModalView";
import { ConfirmationModalView } from "@/views/ConfirmationModalView";

export class DIContainerHelper {
  public static buildDIContainer(): void {
    container.addSingleton<TodoModel>(TodoModel);

    container.addSingleton<View>(View);
    container.addSingleton<ViewBase>(ViewBase, "ViewBase");
    container.addSingleton<ViewHome>(ViewHome, "ViewHome");
    container.addSingleton<ViewTodo>(ViewTodo, "ViewTodo");
    container.addSingleton<ViewAbout>(ViewAbout, "ViewAbout");
    container.addSingleton<ModalView>(ModalView);
    container.addSingleton<ConfirmationModalView>(ConfirmationModalView);

    container.addSingleton<ITodosRepository>(TodosRepository);
    container.addSingleton<IBackupDataService>(BackupDataService);
  }
}
