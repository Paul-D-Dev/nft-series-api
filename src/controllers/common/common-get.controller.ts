import { Application, Request, Response, Router } from "express";
import { AbstractService } from "../../core/abstract.service";

export const commonGetController = <T, DB>(app: Application, service: AbstractService<T, DB>, abstractRouter: Router) => {
  abstractRouter.get('/', async (req: Request, res: Response) => {
    try {
      const result: T[] = await service.getAll();
      return res.send(result);
    } catch (e) {
      console.error('Common controller getAll: ', e);
      return res.status(500).json({ message: 'Server Error' });
    }
  });

};
