import { Application, Request, Response, Router } from "express";
import { ImageService } from "../services/image.service";
import { uploadImage } from "../middlewares/upload-image";


export const ImageController = (app: Application) => {
  let router: Router = Router();
  const service = new ImageService();

  router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const result = await service.getById(id);
    return res.status(200).send(result);

  });

  router.post('/', uploadImage(), async (req: Request, res: Response) => {
    try {
      const file: Express.Multer.File | undefined = req.file;
      const body = req.body;

      if (!file) {
        return res.status(400).json({ message: 'No image provided' });
      }

      await service.post(body, file.path);
      return res.status(201).end();
    } catch (e) {
      return res.status(500).json({ message: 'Can not upload the image' });
    }

  });

  app.use('/images', router);
};
