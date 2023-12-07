import { Application, Request, Response, Router } from "express";
import { AbstractService } from "../../core/abstract.service";

export const commonPutController = <T, JSON, DB>(app: Application, service: AbstractService<T, JSON, DB>, abstractRouter: Router) => {

  abstractRouter.put('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const body = req.body;
    try {
      await service.put(id, body);
      return res.status(200).send();
    } catch (e) {
      console.error('Common controller put: ', e);
      return res.status(500).json({ message: 'Server Error' });
    }
  });

};
