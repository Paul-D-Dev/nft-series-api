import { AbstractModel } from "../core/abstract.model";
import { INft } from "../interfaces/nft.interface";
import { DbPut, DbSave, INftDb } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export class NftModel extends AbstractModel<INft, INftDb> {
  protected mapPutJSONToDb(element: Put<INft>): DbPut<INftDb> {
    return {
      token_id: element?.tokenId,
      name: element?.name,
      contract_address: element?.contractAddress,
      image_id: element.imageId
    };
  }

  protected mapSaveJSONToDb(element: Save<INft>): DbSave<INftDb> {
    return undefined;
  }

}
