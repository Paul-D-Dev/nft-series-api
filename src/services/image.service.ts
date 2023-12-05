import { AbstractService } from "../core/abstract.service";
import { Image, ImageJSON } from "../interfaces/image.interface";
import { ImageDb } from "../interfaces/db";
import { AbstractRepository } from "../core/abstract.repository";
import { ImageRepository } from "../repositories/image.repository";

export class ImageService extends AbstractService<Image, ImageJSON, ImageDb> {
  protected repository: AbstractRepository<Image, ImageJSON, ImageDb> = new ImageRepository();
}
