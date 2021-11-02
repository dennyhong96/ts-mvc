import { Controller } from "./controllers/Controller";
import { TodoController } from "./controllers/TodoController";
import { TodoFormController } from "./controllers/TodoFormController";
import { Model } from "./models/Model";
import { todoModel } from "./models/TodoModel";
import { TodoFormView } from "./views/TodoFormView";
import { TodoPageView } from "./views/TodoPageView";
import { TodoView } from "./views/TodoView";

function main() {
  const todoPageView = new TodoPageView(document.querySelector("#root")!);
  new Controller(new Model({}), todoPageView);

  const todoFormView = new TodoFormView(todoPageView.container.querySelector("#form")!);
  new TodoFormController(todoModel, todoFormView);

  const todoView = new TodoView(todoPageView.container.querySelector("#todo")!);
  new TodoController(todoModel, todoView);
}

window.addEventListener("load", main);
