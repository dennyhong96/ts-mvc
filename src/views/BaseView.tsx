import { View } from "@/views/View";
import { injectable } from "inversify-props";

@injectable()
export class BaseView extends View {
  public render(props: { username: string; logout: () => void }): HTMLElement {
    const { username, logout } = props;
    return (
      <div className="page">
        <div className="header"></div>
        <div className="leftnav">
          <div>{username}</div>
          <div>
            {/* <a className="appnav" href="/about">
              About
            </a> */}
            {username && <button onclick={logout}>Logout</button>}
          </div>
        </div>
        <div className="page-container"></div>
      </div>
    );
  }
}
