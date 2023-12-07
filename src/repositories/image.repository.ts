import { Image } from "../interfaces/image.interface";
import { ImageDb } from "../interfaces/db";
import { AbstractModel } from "../core/abstract.model";
import { ImageModel } from "../models/image.model";
import { DbHandler } from "./db.handler";
import { TablesEnum } from "../enums/tables.enum";
import { ResultSetHeader } from "mysql2";
import { CustomError } from "../models/custom-error.model";
import { handleCatchError } from "../utils/handleCatchError";

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
  private _DELETE = `
    DELETE
    FROM ${this._table}
    WHERE id = ?;
  `;

  async getById(id: number): Promise<any> {
    try {
      const results: any[] = await this.db.query(this._GET_BY_ID, id);
      console.log(results);
      if (results.length === 0) {
        console.error('ImageRepository - CAN NOT FIND THE ITEM WITH ID: ', id);
        throw new CustomError(404, 'CAN NOT FIND THE ELEMENT');
      }
      return results[0];
    } catch (e) {
      return handleCatchError(e);
    }
  }

  async post(element: any): Promise<number> {
    try {
      const result: ResultSetHeader = await this.db.query(this._POST, element);
      return result.insertId;
    } catch (e) {
      return handleCatchError(e);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const result: ResultSetHeader = await this.db.query(this._DELETE, id);
      if (result.affectedRows === 0) {
        console.error('ImageRepository - CAN NOT FIND THE ITEM WITH ID: ', id);

        throw new CustomError(404, 'CAN NOT FIND THE ELEMENT');
      }
    } catch (e) {
      return handleCatchError(e);
    }
  }

}
