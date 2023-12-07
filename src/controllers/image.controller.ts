import { Application, Request, Response, Router } from "express";
import { ImageService } from "../services/image.service";
import { uploadImage } from "../middlewares/upload-image";
import { CustomError } from "../models/custom-error.model";


export const ImageController = (app: Application) => {
  let router: Router = Router();
  const service = new ImageService();

  router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const result = await service.getById(id);
      return res.status(200).send(result);
    } catch (e) {
      return res.status(500).json({ message: 'Something wrong with the server' });
    }

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

  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await service.delete(id);
      return res.end();
    } catch (e) {
      if (e instanceof CustomError) {
        return res.status(e.status).json({ message: e.message });
      } else {
        console.log('Image controller - Delete || Error: ', e);
        return res.status(500).json({ message: 'Something wrong with the server' });
      }
    }
  });

  app.use('/images', router);
};
