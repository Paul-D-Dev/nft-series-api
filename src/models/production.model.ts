import { AbstractModel } from "../core/abstract.model";
import { Production } from "../interfaces/production.interface";
import { DbSave, ProductionDb } from "../interfaces/db";
import { Save } from "../interfaces/http-request";

export class ProductionModel extends AbstractModel<Production, ProductionDb> {

  saveJSONToDb(element: Save<Production>): DbSave<ProductionDb> {
    const { creatorId, royaltyFees, title, nameSeo, releaseYear, imageId } = element;
    return {
      creator_id: creatorId,
      royalty_fees: royaltyFees,
      title,
      name_seo: nameSeo,
      release_year: releaseYear,
      image_id: imageId,
    };
  }

}
