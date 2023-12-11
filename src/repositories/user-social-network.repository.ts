import { ResultSetHeader } from "mysql2";
import { TablesEnum } from "../enums/tables.enum";
import { Save } from "../interfaces/http-request";
import { PutUserSocialNetwork, UserSocialNetwork } from "../interfaces/user-social-network.interface";
import { SocialNetworkModel } from "../models/social-network.model";
import { handleCatchError } from "../utils/handleCatchError";
import { DbHandler } from "./db.handler";


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
      AND social_network_id = ?;
  `;
  private readonly _DELETE = `
    DELETE
    FROM ${this._table}
    WHERE user_id = ?
      AND social_network_id = ?;
  `;


  async post(element: Save<UserSocialNetwork>): Promise<number> {
    try {
      const mapEl = this._model.save(element);
      const result: ResultSetHeader = await this._db.query(this._POST, mapEl);
      return result.insertId;
    } catch (e) {
      console.error(`FILE UserSocialNetworkRepository; table: ${this._table}; request: post()`, e);
      throw handleCatchError(e);
    }
  }

  async put(userId: number, socialId: number, element: PutUserSocialNetwork): Promise<any> {
    try {
      const mapEl = this._model.put(element);
      return await this._db.query(this._UPDATE, [mapEl, userId, socialId]);
    } catch (e) {
      throw e;
    }
  }

  async delete(userId: number, socialId: number): Promise<any> {
    try {
      return await this._db.query(this._DELETE, [userId, socialId]);
    } catch (e) {
      throw e;
    }
  }
}
