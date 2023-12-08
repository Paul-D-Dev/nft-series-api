import { AbstractModel } from "../core/abstract.model";
import { ProductionToDb } from "../interfaces/production.interface";
import { DbPut, DbSave, ProductionDb } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export class ProductionModel extends AbstractModel<ProductionToDb, ProductionDb> {

  mapSaveJSONToDb(element: Save<ProductionToDb>): DbSave<ProductionDb> {
    const { creator, royaltyFees, title, nameSeo, releaseYear, image } = element;
    return {
      creator_id: creator.id,
      royalty_fees: royaltyFees,
      title,
      name_seo: nameSeo,
      release_year: releaseYear,
      image_id: image?.id || null,
    };
  }

  mapPutJSONToDb(element: Put<ProductionToDb>): DbPut<ProductionDb> {
    return {
      creator_id: element?.creator?.id,
      royalty_fees: element?.royaltyFees,
      title: element?.title,
      name_seo: element?.nameSeo,
      release_year: element?.releaseYear,
      image_id: element?.image?.id,
      updated_at: this.setUpdateAt()
    };
  }

}
