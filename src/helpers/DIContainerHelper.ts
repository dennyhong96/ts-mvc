import { container } from "inversify-props";
import { BackupDataService } from "@/services/BackupDataService";
import { TodosRepository } from "@/services/repositories/TodosRepository";
import { IBackupDataService } from "@/types/interfaces/services/IBackupDataService";
import { ITodosRepository } from "@/types/interfaces/services/repositories/ITodosRepository";
import { TodoModel } from "@/models/TodoModel";

import { ViewAbout } from "@/views/viewAbout";
import { BaseView } from "@/views/BaseView";
import { HomeView } from "@/views/HomeView";
import { ViewTodo } from "@/views/viewTodo";
import { View } from "@/views/View";
import { ModalView } from "@/views/ModalView";
import { ConfirmationModalView } from "@/views/ConfirmationModalView";
import { AuthModel } from "@/models/AuthModel";
import { IPubSubService } from "@/types/interfaces/services/IPubSubService";
import { PubSubService } from "@/services/PubSubService";
import { ChatroomsView } from "@/views/ChatroomsView";
import { ChatroomsModel } from "@/models/ChatroomsModel";

export class DIContainerHelper {
  public static buildDIContainer(): void {
    // Models
    container.addSingleton<TodoModel>(TodoModel);
    container.addSingleton<AuthModel>(AuthModel);
    container.addSingleton<ChatroomsModel>(ChatroomsModel);

    // Views
    container.addSingleton<View>(View);
    container.addSingleton<BaseView>(BaseView);
    container.addSingleton<HomeView>(HomeView);
    container.addSingleton<ChatroomsView>(ChatroomsView);

    container.addSingleton<ViewTodo>(ViewTodo, "ViewTodo");
    container.addSingleton<ViewAbout>(ViewAbout, "ViewAbout");
    container.addSingleton<ModalView>(ModalView);
    container.addSingleton<ConfirmationModalView>(ConfirmationModalView);

    container.addSingleton<ITodosRepository>(TodosRepository);

    container.addTransient<IPubSubService>(PubSubService);
    container.addSingleton<IBackupDataService>(BackupDataService);
  }
}
