import "reflect-metadata";

import { App } from "@/app/app";
import { DIContainerHelper } from "@/helpers/DIContainerHelper";
import { HomeController } from "@/controllers/HomeController";
import { ChatroomsController } from "@/controllers/ChatroomsController";
import { ChatsController } from "@/controllers/ChatsController";

import "@/styles/index.scss";

DIContainerHelper.buildDIContainer();

export class MyApp extends App {
  constructor() {
    super();

    const router = this.getRouter();
    router.addRoute("/", HomeController);
    router.addRoute("/chats", ChatroomsController);
    router.addRoute("/chats/:chatroomId", ChatsController);

    this.load();
  }
}

function main() {
  new MyApp();
}
window.addEventListener("load", main);
