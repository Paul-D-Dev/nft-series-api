import { Application, Request, Response, Router } from "express";
import { UserService } from "../services/user.service";
import { commonController } from "../core/common.controller";
import { CustomError } from "../models/custom-error.model";
import { ImageService } from "../services/image.service";
import { Image } from "../interfaces/image.interface";
import { uploadImage } from "../middlewares/upload-image";

export const UserController = (app: Application) => {
  let router: Router = Router();
  const service = new UserService();
  const imageService = new ImageService();
  commonController(app, service, router);

  router.post('/images', uploadImage(), async (req: Request, res: Response) => {
    try {
      const imageFile = req.file;
      const body = req.body;
      const imageBody: Partial<Image> = {
        alt: body?.alt
      };
      if (imageFile) {
        const imageId = await imageService.post(imageBody, imageFile!.path);
        console.log(imageId);
        const newUser = {
          ...body,
          imageId
        };
        console.log(newUser);
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
