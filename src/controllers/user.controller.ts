import { Application, Request, Response, Router } from "express";
import { User } from "../interfaces/user.interface";
import { uploadImage } from "../middlewares/upload-image";
import { validate } from "../middlewares/validate";
import { CustomError } from "../models/custom-error.model";
import { UserService } from "../services/user.service";
import { createUser } from "../validations";
import { commonDeleteController, commonGetByIdController, commonGetController, commonPutController } from "./common";

export const UserController = (app: Application) => {
  let router: Router = Router();
  const service = new UserService();

  commonGetController(app, service, router);
  commonGetByIdController(app, service, router);
  commonPutController(app, service, router);
  commonDeleteController(app, service, router);

  router.post('/', uploadImage(), validate(createUser), async (req: Request, res: Response) => {
    try {
      const userBody: User = req.body;
      const imageFile: Express.Multer.File | undefined = req.file;

      await service.postWithImage(userBody, imageFile);

      return res.status(201).end();

    } catch (e) {
      if (e instanceof CustomError) {
        return res.status(e.status).json({ message: e.message });
      } else {
        return res.status(500).json({ message: 'INTERNAL SERVER ERROR' });
      }
    }
  });

  app.use('/users', router);
};
