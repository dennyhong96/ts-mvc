import { container } from "inversify-props";
import { BackupDataService } from "@/services/BackupDataService";
import { IBackupDataService } from "@/types/interfaces/services/IBackupDataService";
import { BaseView } from "@/views/BaseView";
import { HomeView } from "@/views/HomeView";
import { View } from "@/views/View";
import { ModalView } from "@/views/ModalView";
import { ConfirmationModalView } from "@/views/ConfirmationModalView";
import { AuthModel } from "@/models/AuthModel";
import { IPubSubService } from "@/types/interfaces/services/IPubSubService";
import { PubSubService } from "@/services/PubSubService";
import { ChatroomsView } from "@/views/ChatroomsView";
import { ChatroomsModel } from "@/models/ChatroomsModel";
import { ChatsModel } from "@/models/ChatsModel";
import { ChatsView } from "@/views/ChatsView";
import { ChatsFormView } from "@/views/ChatsFormView";
import { ChatsListView } from "@/views/ChatsListView";
import { ISSEService } from "@/types/interfaces/services/ISSEService";
import { IChatsRepository } from "@/types/interfaces/services/repositories/IChatsRepository";
import { IChatroomsRepository } from "@/types/interfaces/services/repositories/IChatroomsRepository";
import { SSEService } from "@/services/SSEService";
import { ChatsRepository } from "@/services/repositories/ChatsRepository";
import { ChatroomsRepository } from "@/services/repositories/ChatroomsRepository";

export class DIContainerHelper {
  public static buildDIContainer(): void {
    // Models
    container.addSingleton<AuthModel>(AuthModel);
    container.addSingleton<ChatroomsModel>(ChatroomsModel);
    container.addSingleton<ChatsModel>(ChatsModel);

    // Views
    container.addSingleton<View>(View);
    container.addSingleton<BaseView>(BaseView);
    container.addSingleton<HomeView>(HomeView);
    container.addSingleton<ChatroomsView>(ChatroomsView);
    container.addSingleton<ChatsView>(ChatsView);
    container.addSingleton<ChatsListView>(ChatsListView);
    container.addSingleton<ChatsFormView>(ChatsFormView);
    container.addSingleton<ModalView>(ModalView);
    container.addSingleton<ConfirmationModalView>(ConfirmationModalView);

    // Services
    container.addSingleton<ISSEService>(SSEService);
    container.addSingleton<IPubSubService>(PubSubService);
    container.addSingleton<IBackupDataService>(BackupDataService);

    // Repositories
    container.addSingleton<IChatsRepository>(ChatsRepository);
    container.addSingleton<IChatroomsRepository>(ChatroomsRepository);
  }
}
