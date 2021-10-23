import express from "express";
import cookieParser from "cookie-parser";
import { Controller } from "./src/interfaces/controller.interface";
import { db } from "./src/db";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToTheDatabase();
    this.initializeMiddlewares();
    this.initializeControlers(controllers);
  }

  public listen(): void {
    this.app.listen(3001, () => {
      console.log("App listening on port 3001");
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeControlers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private async connectToTheDatabase() {
    await db.sequelize.authenticate();
  }
}

export default App;
