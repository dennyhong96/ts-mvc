import "reflect-metadata";

import { App } from "./app/app";
import { DIContainerHelper } from "@/helpers/DIContainerHelper";
import { HomeController } from "./controllers/HomeController";
import { ChatroomsController } from "./controllers/ChatroomsController";
import { ChatsController } from "./controllers/ChatsController";

DIContainerHelper.buildDIContainer();

export class MyApp extends App {
  constructor(appBody: HTMLElement) {
    super({
      appBody: appBody,
    });

    const router = this.getRouter();
    router.addRoute("/", HomeController);
    router.addRoute("/chats", ChatroomsController);
    router.addRoute("/chats/:chatroomId", ChatsController);

    this.load();
  }
}

function main() {
  new MyApp(document.getElementById("#root")!);
}
window.addEventListener("load", main);
