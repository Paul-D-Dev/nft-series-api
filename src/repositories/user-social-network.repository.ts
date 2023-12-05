import { SocialNetworkModel } from "../models/social-network.model";
import { TablesEnum } from "../enums/tables.enum";
import { DbHandler } from "./db.handler";
import { PutUserSocialNetwork } from "../interfaces/user-social-network.interface";

export class UserSocialNetworkRepository {
  private readonly _table = TablesEnum.USER_SOCIAL_NETWORKS;
  private readonly _db: DbHandler = DbHandler.getInstance();
  private _model = new SocialNetworkModel();

  private readonly _UPDATE = `
    UPDATE ${this._table}
    SET ?
    WHERE user_id = ?
      AND social_network_id = ?
  `;

  //@TODO post

  put(userId: number, socialId: number, element: PutUserSocialNetwork): Promise<any> {
    const mapEl = this._model.put(element);
    return this._db.query(this._UPDATE, [mapEl, userId, socialId]);
  }

  //@TODO delete
}
