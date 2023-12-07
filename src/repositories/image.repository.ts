import { Image } from "../interfaces/image.interface";
import { ImageDb } from "../interfaces/db";
import { AbstractModel } from "../core/abstract.model";
import { ImageModel } from "../models/image.model";
import { DbHandler } from "./db.handler";
import { TablesEnum } from "../enums/tables.enum";
import { ResultSetHeader } from "mysql2";

export class ImageRepository {

  db = DbHandler.getInstance();
  model: AbstractModel<Image, ImageDb> = new ImageModel();
  private readonly _table = TablesEnum.IMAGES;

  private _GET_BY_ID = `
    SELECT *
    FROM ${this._table}
    WHERE id = ?;
  `;
  private _POST = `
    INSERT INTO ${this._table}
    SET ?;
  `;

  async getById(id: number): Promise<any> {
    try {
      const results = await this.db.query(this._GET_BY_ID, id);
      return await results[0] || null;
    } catch (e) {
      throw e;
    }
  }

  async post(element: any): Promise<number> {
    try {
      const result: ResultSetHeader = await this.db.query(this._POST, element);
      return result.insertId;
    } catch (e) {
      throw e;
    }
  }

}
