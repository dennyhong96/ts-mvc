import { inject } from "inversify-props";
import { ControllerBase } from "./controllerBase";
import { HomeView } from "@/views/HomeView";
import { MyApp } from "..";

export class ControllerHome extends ControllerBase {
  @inject() private homeView!: HomeView;

  constructor(public app: MyApp) {
    super(app);

    console.log(this.homeView);
    this.homeView.registerContainer(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    this.renderPage();
  }

  protected renderPage(): void {
    this.render(
      this.pageContainer,
      this.homeView.render({
        login: this.login.bind(this),
      }),
    );
  }
}
