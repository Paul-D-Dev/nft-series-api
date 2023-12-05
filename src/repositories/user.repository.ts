import { AbstractRepository } from "../core/abstract.repository";
import { User, UserJSON } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { AbstractModel } from "../core/abstract.model";
import { UserModel } from "../models/user.model";
import { TablesEnum } from "../enums/tables.enum";
import { replaceImageSQL } from "../utils/request-sql/replaceImageSQL";

export class UserRepository extends AbstractRepository<User, UserJSON, UserDb> {
  constructor() {
    super(TablesEnum.USERS);
  }

  model: AbstractModel<User, UserDb> = new UserModel();

  GET_ALL = `
    SELECT t.id,
           t.name,
           t.name_seo                   AS nameSeo,
           t.bio,
           t.is_verified                AS isVerified,
           t.contract_address           AS contractAddress,
           ${replaceImageSQL('t', 'i')} AS image,
           t.created_at                 AS createdAt,
           t.updated_at                 AS updatedAt
    FROM ${this.table} t
           LEFT JOIN images i ON t.image_id = i.id
  `;

  GET_BY_ID = `${this.GET_ALL} WHERE t.id = ?;`;

}
