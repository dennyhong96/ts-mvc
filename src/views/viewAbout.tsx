import { View } from "@/views/View";

export class ViewAbout extends View<any> {
  constructor(public container: HTMLElement) {
    super(container);
  }

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
