import { AbstractModel } from "../core/abstract.model";
import { Production } from "../interfaces/production.interface";
import { DbPut, DbSave, ProductionDb } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export class ProductionModel extends AbstractModel<Production, ProductionDb> {

  mapSaveJSONToDb(element: Save<Production>): DbSave<ProductionDb> {
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

  mapPutJSONToDb(element: Put<Production>): DbPut<ProductionDb> {
    return {
      creator_id: element?.creatorId,
      royalty_fees: element?.royaltyFees,
      title: element?.title,
      name_seo: element?.nameSeo,
      release_year: element?.releaseYear,
      image_id: element?.imageId,
      updated_at: this.setUpdateAt()
    };
  }

}
