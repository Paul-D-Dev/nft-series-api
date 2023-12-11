import { AbstractRepository } from "../core/abstract.repository";
import { TablesEnum } from "../enums/tables.enum";
import { UserDb } from "../interfaces/db/user-db.interface";
import { User, UserToDb } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";
import { getJSONImageSQL } from "../utils/request-sql/getJSONImageSQL";
import { getJsonSocialNetwork } from "../utils/request-sql/getJsonSocialNetwork";

export class UserRepository extends AbstractRepository<User, UserDb, UserToDb> {
  constructor() {
    super(TablesEnum.USERS);
  }

  protected readonly model = new UserModel();

  protected GET_ALL = `
    SELECT t.id,
           t.name,
           t.name_seo                   AS nameSeo,
           t.bio,
           t.is_verified                AS isVerified,
           t.contract_address           AS contractAddress,
           ${getJSONImageSQL('t', 'i')} AS image,
           CASE
             WHEN COUNT(sn.social_network_id) > 0
               THEN JSON_ARRAYAGG(${getJsonSocialNetwork('sn', 'asn')})
             ELSE JSON_ARRAY()
             END                        AS socialNetworks,
           t.created_at                 AS createdAt,
           t.updated_at                 AS updatedAt
    FROM ${this.table} t
           LEFT JOIN ${TablesEnum.IMAGES} i ON t.image_id = i.id
           LEFT JOIN ${TablesEnum.USER_SOCIAL_NETWORKS} sn on t.id = sn.user_id
           LEFT JOIN ${TablesEnum.AVAILABLE_SOCIAL_NETWORKS} asn ON sn.social_network_id = asn.id
         -- Group by because there are many social networks
    GROUP BY t.id
  `;

  protected GET_BY_ID = `
    SELECT t.id,
           t.name,
           t.name_seo                   AS nameSeo,
           t.bio,
           t.is_verified                AS isVerified,
           t.contract_address           AS contractAddress,
           ${getJSONImageSQL('t', 'i')} AS image,
           CASE
             WHEN COUNT(sn.social_network_id) > 0
               THEN JSON_ARRAYAGG(${getJsonSocialNetwork('sn', 'asn')})
             ELSE JSON_ARRAY()
             END                        AS socialNetworks,
           t.created_at                 AS createdAt,
           t.updated_at                 AS updatedAt
    FROM ${this.table} t
           LEFT JOIN ${TablesEnum.IMAGES} i ON t.image_id = i.id
           LEFT JOIN ${TablesEnum.USER_SOCIAL_NETWORKS} sn on t.id = sn.user_id
           LEFT JOIN ${TablesEnum.AVAILABLE_SOCIAL_NETWORKS} asn ON sn.social_network_id = asn.id
    WHERE t.id = ?
  `;
}
