import { AbstractModel } from "../core/abstract.model";
import { Production } from "../interfaces/production.interface";
import { DbPut, DbSave, ProductionDb } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export class ProductionModel extends AbstractModel<Production, ProductionDb> {

  mapSaveJSONToDb(element: Save<Production>): DbSave<ProductionDb> {
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

  mapPutJSONToDb(element: Put<Production>): DbPut<ProductionDb> {
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
