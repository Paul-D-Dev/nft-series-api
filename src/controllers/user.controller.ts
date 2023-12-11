import { Application, Request, Response, Router } from "express";
import { Save } from "../interfaces/http-request";
import { Image } from "../interfaces/image.interface";
import { UserSocialNetwork } from "../interfaces/user-social-network.interface";
import { User, UserToDb } from "../interfaces/user.interface";
import { uploadImage } from "../middlewares/upload-image";
import { CustomError } from "../models/custom-error.model";
import { ImageService } from "../services/image.service";
import { UserSocialNetworkService } from "../services/user-social-network.service";
import { UserService } from "../services/user.service";
import { commonDeleteController, commonGetByIdController, commonGetController, commonPutController } from "./common";

export const UserController = (app: Application) => {
  let router: Router = Router();
  const service = new UserService();
  const userSocialNetworkService = new UserSocialNetworkService();
  const imageService = new ImageService();

  commonGetController(app, service, router);
  commonGetByIdController(app, service, router);
  commonPutController(app, service, router);
  commonDeleteController(app, service, router);

  router.post('/', uploadImage(), async (req: Request, res: Response) => {
    try {
      let userId: number;
      const userBody: User = req.body;

      // Save Image
      const imageFile: Express.Multer.File | undefined = req.file;
      if (userBody.image && imageFile) {
        const imageBody: Partial<Image> = {
          alt: userBody.image.alt
        };
        const imageId: number = await imageService.post(imageBody, imageFile.path);
        const newUser: UserToDb = {
          ...userBody,
          image: {
            id: imageId
          }
        };
        userId = await service.post(newUser);
      } else {
        userId = await service.post(userBody);
      }

      // Once user id inserted
      if (userBody.socialNetworks.length > 0 && userId > 0) {
        // Insert his social networks
        for (const social of userBody.socialNetworks) {
          const saveSocial: Save<UserSocialNetwork> = {
            socialNetworkId: social.socialNetworkId,
            userId: userId,
            profileUrl: social.profileUrl,
            name: social.name
          };
          await userSocialNetworkService.post(saveSocial);
        }
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
