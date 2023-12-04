import { Application, Request, Response, Router } from "express";
import { AbstractService } from "./abstract.service";

export const commonController = <T>(app: Application, service: AbstractService<T>, abstractRouter = Router()) => {

  abstractRouter.get('/', async (req: Request, res: Response) => {
    try {
      const result: T[] = await service.getAll();
      return res.send(result);
    } catch (e) {
      console.error('Common controller get: ', e);
      return res.status(404).send('Can not retrieve get all')
    }
  });

  abstractRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
      const result: T | null = await service.getById(id);
      res.send(result);
    } catch (e) {
      console.error('Common controller get by ID: ', e);
      return res.status(404).send(`Can not retrieve get element with id: ${id}`)
    }
  })

}
