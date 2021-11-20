import { View } from "@/views/View";
import { injectable } from "inversify-props";

@injectable()
export class ViewAbout extends View {
  public render(): HTMLElement {
    return (
      <div>
        <h2>About</h2>
        <table className="about-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}
