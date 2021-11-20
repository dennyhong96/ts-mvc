import { injectable } from "inversify-props";
import { ModalView } from "./ModalView";

@injectable()
export class ConfirmationModalView extends ModalView {
  protected content = (<div>Confirmation</div>);
}
