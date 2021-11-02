import { Model } from "@/models/Model";
import { View } from "@/views/View";

export class Controller<S, V extends View<S>> {
  constructor(public model: Model<S>, view: V) {
    view.render(model.state);
    model.registerSubscriber(view.render);
    view.attachHandler(this.handler);
  }

  public handler(container: HTMLElement): void {
    for (const key in container) {
      if (/^on/.test(key)) {
        const eventType = key.substr(2);
        switch (eventType) {
          default: {
            break;
          }
        }
      }
    }
  }
}
