import { Application, Router } from "express";
import { ProductionService } from "../services/production.service";
import { commonController } from "../core/common.controller";

export const ProductionController = (app: Application): void => {
  let router: Router = Router();
  const service = new ProductionService();
  commonController(app, service, router);

  app.use('/productions', router);
}
