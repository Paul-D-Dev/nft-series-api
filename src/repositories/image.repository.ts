import { AbstractRepository } from "../core/abstract.repository";
import { Image, ImageJSON } from "../interfaces/image.interface";
import { ImageDb } from "../interfaces/db";
import { AbstractModel } from "../core/abstract.model";
import { ImageModel } from "../models/image.model";
import { TablesEnum } from "../enums/tables.enum";

export class ImageRepository extends AbstractRepository<Image, ImageJSON, ImageDb> {
  constructor() {
    super(TablesEnum.IMAGES);
  }

  model: AbstractModel<Image, ImageDb> = new ImageModel();

}
