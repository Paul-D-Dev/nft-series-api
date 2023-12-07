import { Application, Request, Response, Router } from "express";
import { AbstractService } from "../../core/abstract.service";

export const commonDeleteController = <T, JSON, DB>(app: Application, service: AbstractService<T, JSON, DB>, abstractRouter: Router) => {

  abstractRouter.delete('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      await service.delete(id);
      return res.status(200).send();
    } catch (e) {
      console.error('Common controller delete: ', e);
      return res.status(500).json({ message: 'Server Error' });
    }
  });

};
