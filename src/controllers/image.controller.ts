import { Application, Router } from "express";
import { ImageService } from "../services/image.service";
import { commonController } from "../core/common.controller";

export const ImageController = (app: Application) => {
  let router: Router = Router();
  const service = new ImageService();
  commonController(app, service);

  app.use('/images', router);
}
