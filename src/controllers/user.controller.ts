import { Application, Router } from "express";
import { UserService } from "../services/user.service";
import { commonController } from "../core/common.controller";

export const UserController = (app: Application) => {
  let router: Router = Router();
  const service = new UserService();
  commonController(app, service, router);

  app.use('/users', router);
}
