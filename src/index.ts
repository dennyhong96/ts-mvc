import "reflect-metadata";

import { Controller } from "@/controllers/Controller";
import { TodoController } from "@/controllers/TodoController";
import { TodoFormController } from "@/controllers/TodoFormController";
import { initialTodoState, TodoModel } from "@/models/TodoModel";
import { TodoFormView } from "@/views/TodoFormView";
import { TodoPageView } from "@/views/TodoPageView";
import { TodoView } from "@/views/TodoView";
import { DIContainerHelper } from "@/helpers/DIContainerHelper";

DIContainerHelper.buildDIContainer();

function main() {
  const todoModel = new TodoModel(initialTodoState);

  const todoPageView = new TodoPageView(document.querySelector("#root")!);
  new Controller(undefined, todoPageView);

  const todoFormView = new TodoFormView(todoPageView.container.querySelector("#form")!);
  new TodoFormController(todoModel, todoFormView);

  const todoView = new TodoView(todoPageView.container.querySelector("#todo")!);
  new TodoController(todoModel, todoView);
}

window.addEventListener("load", main);
