import multer from "multer";
import { NextFunction, Request, Response } from "express";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename(req: Request, file: Express.Multer.File, callback: (error: (Error | null), filename: string) => void) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname).toLowerCase());
  }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  const isAllowed = allowedExtensions.includes(path.extname(file.originalname).toLowerCase());

  if (isAllowed) {
    cb(null, true);
  } else {
    cb(new Error('The file should be .png, .jpg, .jpeg'));
  }
};

const upload = multer({ storage, fileFilter }).single('image');

export const uploadImage = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, err => {
      if (err instanceof multer.MulterError) {
        switch (err.code) {
          case 'LIMIT_UNEXPECTED_FILE':
            return res.status(409).json({ message: `FieldName '${err.field}' used is incorrect` });
          default:
            return res.status(500).json({ message: 'Error with multer' });
        }
      } else if (err) {
        return res.status(409).json({ message: 'Invalid extension' });
      } else {
        next();
      }
    });
  };
};
