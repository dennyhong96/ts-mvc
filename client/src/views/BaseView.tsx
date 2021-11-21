import { View } from "@/views/View";
import { injectable } from "inversify-props";

import logoutIcon from "@/assets/icons/logout.svg";
import styles from "@/styles/BaseView.module.scss";
import { Utils } from "@/utils/Utils";
import { IAuthState } from "@/types/interfaces/IAuthState";

@injectable()
export class BaseView extends View {
  public pageContainer: HTMLDivElement = (<div className={this.cx(styles.pageContainer)}></div>);

  public render(props: { user: IAuthState; logout: () => void; users: IAuthState[] }): HTMLElement {
    const { user, logout, users } = props;
    const onlineUserCount = users.length;
    if (onlineUserCount === 0) {
      users.push(user);
    }
    return (
      <div className={this.cx(styles.page)}>
        {user.userId && (
          <header className={this.cx(styles.header)}>
            <div className={styles.userContainer}>
              <div className={styles.users}>
                {users.map((u) => (
                  <div className={styles.userWrapper}>
                    <div className={this.cx(styles.user)}>
                      {Utils.generateAvatarText(u.username)}
                    </div>
                    {onlineUserCount > 0 ? <div className={styles.online}></div> : null}
                  </div>
                ))}
              </div>
            </div>
            <button className={this.cx(styles.logout)} onclick={logout}>
              <img src={logoutIcon} alt="Logout" />
            </button>
          </header>
        )}
        {this.pageContainer}
      </div>
    );
  }
}
