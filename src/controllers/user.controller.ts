import { Application, Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { CustomError } from "../models/custom-error.model";
import { ImageService } from "../services/image.service";
import { Image } from "../interfaces/image.interface";
import { uploadImage } from "../middlewares/upload-image";
import { commonDeleteController, commonGetByIdController, commonGetController, commonPutController } from "./common";

export const UserController = (app: Application) => {
  let router: Router = Router();
  const service = new UserService();
  const imageService = new ImageService();

  commonGetController(app, service, router);
  commonGetByIdController(app, service, router);
  commonPutController(app, service, router);
  commonDeleteController(app, service, router);

  router.post('/', uploadImage(), async (req: Request, res: Response) => {
    try {
      const imageFile = req.file;
      const body = req.body;
      if (body.image && imageFile) {
        const imageBody: Partial<Image> = {
          alt: body.image.alt
        };
        const imageId = await imageService.post(imageBody, imageFile.path);
        const newUser = {
          ...body,
          imageId
        };
        await service.post(newUser);
      } else {
        await service.post(body);
      }

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
