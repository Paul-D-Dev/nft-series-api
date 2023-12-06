import { SocialNetworkModel } from "../models/social-network.model";
import { TablesEnum } from "../enums/tables.enum";
import { DbHandler } from "./db.handler";
import { PutUserSocialNetwork, UserSocialNetwork } from "../interfaces/user-social-network.interface";


export class UserSocialNetworkRepository {
  private readonly _table = TablesEnum.USER_SOCIAL_NETWORKS;
  private readonly _db: DbHandler = DbHandler.getInstance();
  private _model = new SocialNetworkModel();

  private readonly _POST = `
    INSERT INTO ${this._table}
    SET ?;
  `;
  private readonly _UPDATE = `
    UPDATE ${this._table}
    SET ?
    WHERE user_id = ?
      AND social_network_id = ?
  `;


  async post(element: UserSocialNetwork): Promise<any> {
    try {
      console.log('POST?');
      const mapEl = this._model.save(element);
      return await this._db.query(this._POST, mapEl);
    } catch (e) {
      // @TODO catch duplicate code from error.code comes from SQL
      throw e;
    }
  }

  async put(userId: number, socialId: number, element: PutUserSocialNetwork): Promise<any> {
    const mapEl = this._model.put(element);
    return await this._db.query(this._UPDATE, [mapEl, userId, socialId]);
  }

  //@TODO delete
}
