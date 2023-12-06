import { AbstractRepository } from "../core/abstract.repository";
import { INft, INftJSON } from "../interfaces/nft.interface";
import { INftDb } from "../interfaces/db";
import { TablesEnum } from "../enums/tables.enum";
import { AbstractModel } from "../core/abstract.model";

export class NftRepository extends AbstractRepository<INft, INftJSON, INftDb> {
  constructor() {
    super(TablesEnum.NFTS);
  }

  model: AbstractModel<INft, INftDb>;

}
