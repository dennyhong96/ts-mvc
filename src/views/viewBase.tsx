import { View } from "@/views/View";
import { injectable } from "inversify-props";

@injectable()
export class ViewBase extends View {
  public render(): HTMLElement {
    return (
      <div className="page">
        <div className="header">
          <div className="company-name">
            <a href="/" className="appnav">
              Mega Bank
            </a>
          </div>
        </div>
        <div className="leftnav">
          <div>
            <a className="appnav" href="/">
              Accounts
            </a>
          </div>
          <div>
            <a className="appnav" href="/about">
              About
            </a>
          </div>
        </div>
        <div className="page-container"></div>
      </div>
    );
  }
}
