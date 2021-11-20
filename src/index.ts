import "reflect-metadata";

import { App } from "./app/app";
import { ControllerHome } from "./controllers/controllerHome";
import { ControllerAbout } from "./controllers/controllerAbout";
import { ControllerTodo } from "./controllers/controllerTodo";
import { DIContainerHelper } from "@/helpers/DIContainerHelper";
DIContainerHelper.buildDIContainer();

export class MyApp extends App {
  constructor(appBody: HTMLElement) {
    super({
      appBody: appBody,
    });

    const router = this.getRouter();
    router.addRoute("/", ControllerHome);
    router.addRoute("/about", ControllerAbout);
    router.addRoute("/todos/:todoId", ControllerTodo);

    this.load();
  }
}

function main() {
  new MyApp(document.getElementById("#root")!);
}
window.addEventListener("load", main);
