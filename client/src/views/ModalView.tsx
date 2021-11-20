import { injectable } from "inversify-props";

import { View } from "@/views/View";
import styles from "@/styles/Modal.module.scss";
import closeIcon from "@/assets/icons/close.svg";

@injectable()
export class ModalView extends View {
  protected content: HTMLElement | null = null;
  public render(props: { show: boolean; closeModal: () => void }): HTMLElement {
    const { show, closeModal } = props;
    return show ? (
      <div className={this.cx(styles.modal)}>
        <div onclick={closeModal} className={this.cx(styles.bg)} />
        <div className={this.cx(styles.content)}>
          <button onclick={closeModal} className={this.cx(styles.close)}>
            <img src={closeIcon} alt="Close" />
          </button>
          {this.content}
        </div>
      </div>
    ) : (
      <div />
    );
  }
}
