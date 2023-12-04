import { TablesEnum } from "../enums/tables.enum";
import { DbHandler } from "../repositories/db.handler";
import { AbstractModel } from "./abstract.model";
import { Put, Save } from "../interfaces/http-request";

export abstract class AbstractRepository<T, JSON, DB> {
  protected constructor(table: TablesEnum) {
    this.table = table;
    this.GET_ALL = `SELECT *
                    FROM ${table}`;
    this.GET_BY_ID = `SELECT *
                      FROM ${table}
                      WHERE id = ?;`;
    this._POST = `INSERT INTO ${table}
                  SET ?;`;
    this._UPDATE_BY_ID = `UPDATE ${table}
                          SET ?
                          WHERE id = ?;`;
    this._DELETE_BY_ID = `DELETE
                          FROM ${table}
                          WHERE id = ?;`;
  }

  protected readonly db: DbHandler = DbHandler.getInstance();
  protected readonly table: TablesEnum;
  protected GET_ALL: string;
  protected GET_BY_ID: string;
  private readonly _POST: string;
  private readonly _UPDATE_BY_ID: string;
  private readonly _DELETE_BY_ID: string;
  abstract model: AbstractModel<T, DB>


  async findAll(): Promise<JSON[]> {
    const result: JSON[] = await this.db.query(this.GET_ALL);
    return Promise.all(result);
  }

  async findById(id: number): Promise<JSON | null> {
    try {
      const result: JSON[] = await this.db.query(this.GET_BY_ID, id);
      return result[0] || null;
    } catch (e) {
      // TODO error sql queries
      console.error(`${this.table} findById `, e);
      throw new Error('error');
    }
  }

  post(element: Save<T>): Promise<unknown> {
    const mapEl = this.model.saveJSONToDb(element);
    return this.db.query(this._POST, mapEl);
  }

  async put(id: number, element: Put<T>): Promise<T> {
    const mapEl = this.model.putJSONToDb(element);
    // TODO try to fix to avoid to use ts-ignore
    // @ts-ignore
    Object.keys(mapEl).forEach(key => mapEl[key] === undefined && delete mapEl[key]);

    return await this.db.query(this._UPDATE_BY_ID, [mapEl, id])
  }

  async delete(id: number): Promise<unknown> {
    return await this.db.query(this._DELETE_BY_ID, id);
  }
}
