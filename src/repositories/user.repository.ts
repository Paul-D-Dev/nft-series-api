import { AbstractRepository } from "../core/abstract.repository";
import { User, UserJSON } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { AbstractModel } from "../core/abstract.model";
import { UserModel } from "../models/user.model";
import { TablesEnum } from "../enums/tables.enum";
import { getJSONImageSQL } from "../utils/request-sql/getJSONImageSQL";
import { getJsonSocialNetwork } from "../utils/request-sql/getJsonSocialNetwork";

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
           ${getJSONImageSQL('t', 'i')} AS image,
           CASE
             WHEN COUNT(sn.social_network_id) > 0
               THEN JSON_ARRAYAGG(${getJsonSocialNetwork('sn')})
             ELSE JSON_ARRAY()
             END                        AS socialNetworks,
           t.created_at                 AS createdAt,
           t.updated_at                 AS updatedAt
    FROM ${this.table} t
           LEFT JOIN ${TablesEnum.IMAGES} i ON t.image_id = i.id
           LEFT JOIN ${TablesEnum.USER_SOCIAL_NETWORKS} sn on t.id = sn.user_id
         -- Group by because there are many social networks
    GROUP BY t.id
  `;

  GET_BY_ID = `
    SELECT t.id,
           t.name,
           t.name_seo                   AS nameSeo,
           t.bio,
           t.is_verified                AS isVerified,
           t.contract_address           AS contractAddress,
           ${getJSONImageSQL('t', 'i')} AS image,
           CASE
             WHEN COUNT(sn.social_network_id) > 0
               THEN JSON_ARRAYAGG(${getJsonSocialNetwork('sn')})
             ELSE JSON_ARRAY()
             END                        AS socialNetworks,
           t.created_at                 AS createdAt,
           t.updated_at                 AS updatedAt
    FROM ${this.table} t
           LEFT JOIN ${TablesEnum.IMAGES} i ON t.image_id = i.id
           LEFT JOIN ${TablesEnum.USER_SOCIAL_NETWORKS} sn on t.id = sn.user_id
    WHERE t.id = ?
  `;
}
