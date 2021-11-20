import { inject } from "inversify-props";
import { ControllerBase } from "./BaseController";
import { HomeView } from "@/views/HomeView";
import { MyApp } from "..";

export class HomeController extends ControllerBase {
  @inject() private homeView!: HomeView;

  constructor(public app: MyApp) {
    super(app);

    this.homeView.registerContainer(this.pageContainer);
  }

  // @ts-ignore
  protected async loadPage(params: QueryParams): Promise<void> {
    if (this.authModel.state.userId) {
      this.app.getRouter().navigate("/chats");
      return;
    }
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
