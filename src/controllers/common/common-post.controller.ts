import { Application, Request, Response, Router } from "express";
import { AbstractService } from "../../core/abstract.service";

export const commonPostController = <T, DB>(app: Application, service: AbstractService<T, DB>, abstractRouter: Router) => {

  abstractRouter.post('/', async (req: Request, res: Response) => {
    const body = req.body;
    try {
      await service.post(body);
      return res.status(201).send();
    } catch (e) {
      console.error('Common controller post: ', e);
      return res.status(500).json({ message: 'Server Error' });
    }
  });

};
