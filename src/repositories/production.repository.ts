import { AbstractRepository } from "../core/abstract.repository";
import { TablesEnum } from "../enums/tables.enum";
import { Production, ProductionJSON } from "../interfaces/production.interface";
import { replaceImageSQL } from "../utils/request-sql/replaceImageSQL";
import { replaceUserSQL } from "../utils/request-sql/replaceUserSQL";
import { ProductionModel } from "../models/production.model";
import { ProductionDb } from "../interfaces/db";

export class ProductionRepository extends AbstractRepository<Production, ProductionJSON, ProductionDb> {
  constructor() {
    super(TablesEnum.PRODUCTIONS);
  }

  readonly model = new ProductionModel();

  GET_ALL: string = `
    SELECT t.id,
           t.royalty_fees               AS royaltyFess,
           t.title,
           t.name_seo                   AS nameSeo,
           t.release_year               AS releaseYear,
           ${replaceUserSQL('u', 'ui')} AS creator,
           ${replaceImageSQL('t', 'i')} AS image
    FROM ${this.table} t
           LEFT JOIN users u ON t.creator_id = u.id
           LEFT JOIN images i on t.image_id = i.id
           LEFT JOIN images ui on u.image_id = ui.id
  `

  GET_BY_ID: string = `${this.GET_ALL} WHERE t.id = ?;`;


}
