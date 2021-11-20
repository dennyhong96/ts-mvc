import { injectable } from "inversify-props";

import { View } from "@/views/View";

@injectable()
export class ChatsView extends View {
  public listSlot = (<div></div>);
  public formSlot = (<div></div>);
  public render(): HTMLElement {
    return (
      <div>
        {this.listSlot}
        {this.formSlot}
      </div>
    );
  }
}
