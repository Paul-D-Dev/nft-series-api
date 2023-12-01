import { Application, Router } from "express";
import { ProductionService }   from "../services/production.service";

export const ProductionController = (app: Application) => {
  let router: Router = Router();
  const service = new ProductionService();

  router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const result = await service.getCollectionById(+id);
      res.send(result);
    } catch (e) {
      res.status(401)
    }
  })

  app.use('/productions', router);
}
