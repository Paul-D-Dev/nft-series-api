import { Application, Router } from "express";
import { CollectionService }   from "../services/collection.service";

export const CollectionController = (app: Application) => {
  let router: Router = Router();
  const service = new CollectionService();

  router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const result = await service.getCollectionById(+id);
      res.send(result);
    } catch (e) {
      res.status(401)
    }
  })

  app.use('/collections', router);
}
