import { Application, Request, Response, Router } from "express";
import { AbstractService } from "./abstract.service";

export const commonController = <T, JSON, DB>(app: Application, service: AbstractService<T, JSON, DB>, abstractRouter = Router()) => {

  abstractRouter.get('/', async (req: Request, res: Response) => {
    try {
      const result: JSON[] = await service.getAll();
      return res.send(result);
    } catch (e) {
      console.error('Common controller get: ', e);
      return res.status(404).send('Can not retrieve get all')
    }
  });

  abstractRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
      const result: JSON | null = await service.getById(id);
      res.status(200).send(result);
    } catch (e) {
      console.error('Common controller get by ID: ', e);
      return res.status(404).send(`Can not retrieve get element with id: ${id}`)
    }
  });

  abstractRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    try {
      await service.post(body);
      return res.status(201).send();
    } catch (e) {
      console.error('Common controller post: ', e);
      return res.status(400).json(`Can not post : ${body}`)
    }
  });

  abstractRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const body = req.body;
    try {
      await service.put(id, body);
      return res.status(200).send();
    } catch (e) {
      console.error('Common controller put: ', e);
      return res.status(400).json(`Can not update the item with the id : ${id}`)
    }
  })

  abstractRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      await service.delete(id);
      return res.status(200).send();
    } catch (e) {
      console.error('Common controller delete: ', e);
      return res.status(400).json(`Can not delete the item with the id : ${id}`)
    }
  })

}
