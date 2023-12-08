import { Application, Request, Response, Router } from "express";
import { AbstractService } from "../../core/abstract.service";

export const commonGetByIdController = <T, DB>(app: Application, service: AbstractService<T, DB>, abstractRouter: Router) => {
  abstractRouter.get('/:id', async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
      // @TODO remove null type
      const result: T | null = await service.getById(id);
      if (result === null) {
        return res.status(404).json({ message: 'Can not find the element with id' });
      }
      return res.status(200).send(result);
    } catch (e) {
      console.error('Common controller get by ID: ', e);
      return res.status(500).json({ message: 'Server Error' });
    }
  });

};
