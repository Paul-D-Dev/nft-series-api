import { Application, Router } from "express";
import { ProductionService } from "../services/production.service";
import {
  commonDeleteController,
  commonGetByIdController,
  commonGetController,
  commonPostController,
  commonPutController
} from "./common";

export const ProductionController = (app: Application): void => {
  let router: Router = Router();
  const service = new ProductionService();
  commonGetController(app, service, router);
  commonGetByIdController(app, service, router);
  commonPostController(app, service, router);
  commonPutController(app, service, router);
  commonDeleteController(app, service, router);

  app.use('/productions', router);
};
