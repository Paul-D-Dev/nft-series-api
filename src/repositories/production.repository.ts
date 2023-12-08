import { AbstractRepository } from "../core/abstract.repository";
import { TablesEnum } from "../enums/tables.enum";
import { Production, ProductionToDb } from "../interfaces/production.interface";
import { getJSONImageSQL } from "../utils/request-sql/getJSONImageSQL";
import { getJSONUserSQL } from "../utils/request-sql/getJSONUserSQL";
import { ProductionModel } from "../models/production.model";
import { ProductionDb } from "../interfaces/db";

export class ProductionRepository extends AbstractRepository<Production, ProductionDb, ProductionToDb> {
  constructor() {
    super(TablesEnum.PRODUCTIONS);
  }

  readonly model = new ProductionModel();

  GET_ALL: string = `
    SELECT t.id,
           t.royalty_fees               AS royaltyFees,
           t.title,
           t.name_seo                   AS nameSeo,
           t.release_year               AS releaseYear,
           ${getJSONUserSQL('u', 'ui')} AS creator,
           ${getJSONImageSQL('t', 'i')} AS image
    FROM ${this.table} t
           LEFT JOIN users u ON t.creator_id = u.id
           LEFT JOIN images i on t.image_id = i.id
           LEFT JOIN images ui on u.image_id = ui.id
  `;

  GET_BY_ID: string = `${this.GET_ALL} WHERE t.id = ?;`;


}
