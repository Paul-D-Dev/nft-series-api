import { Application, Request, Response, Router } from "express";
import { UserSocialNetworkService } from "../services/user-social-network.service";

export const UserSocialNetworkController = (app: Application): void => {
  let router: Router = Router();
  const service = new UserSocialNetworkService();

  // router.post('/', async (req: Request, res: Response) => {
  //   const body = req.body;
  //   try {
  //     await service.post(body);
  //     return res.status(201).send();
  //   } catch (e) {
  //     console.error('User Social Network post: ', e);
  //     return res.status(500).json({ message: 'Server Error' });
  //   }
  // });

  router.put('/user/:userId/social-network/:socialId', async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId, 10);
    const socialId: number = parseInt(req.params.socialId, 10);
    const body = req.body;
    try {
      await service.put(userId, socialId, body);
      return res.status(200).send();
    } catch (e) {
      console.error('User Social Network  put: ', e);
      return res.status(500).json({ message: 'Server Error' });
    }
  });

  // router.delete('/user/:userId/social-network/:socialId', async (req: Request, res: Response) => {
  //   const id: number = parseInt(req.params.id, 10);
  //   try {
  //     await service.delete(id);
  //     return res.status(200).send();
  //   } catch (e) {
  //     console.error('User Social Network  delete: ', e);
  //     return res.status(500).json({ message: 'Server Error' });
  //   }
  // });

  app.use('/user-social-networks', router);
};
