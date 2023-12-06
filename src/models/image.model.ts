import { AbstractModel } from "../core/abstract.model";
import { Image } from "../interfaces/image.interface";
import { DbPut, DbSave, ImageDb } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export class ImageModel extends AbstractModel<Image, ImageDb> {
  mapPutJSONToDb(element: Put<Image>): DbPut<ImageDb> {
    return {
      src: element?.src,
      alt: element?.alt
    };
  }

  mapSaveJSONToDb(element: Save<Image>): DbSave<ImageDb> {
    return {
      src: element.src,
      alt: element.alt
    };
  }

}
