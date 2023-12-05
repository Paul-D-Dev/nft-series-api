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
  abstract model: AbstractModel<T, DB>;


  async findAll(): Promise<JSON[]> {
    try {
      return await this.db.query(this.GET_ALL);
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: findAll() `, e);
      throw new Error(`Something wrong the SQL request: ${e}`);
    }
  }

  async findById(id: number): Promise<JSON | null> {
    try {
      const result: JSON[] = await this.db.query(this.GET_BY_ID, id);
      return result[0] || null;
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: findById `, e);
      throw new Error(`Something wrong the SQL request: ${e}`);
    }
  }

  async post(element: Save<T>): Promise<unknown> {
    try {
      const mapEl = this.model.save(element);
      return await this.db.query(this._POST, mapEl);
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: post()`, e);
      throw new Error(`Something wrong the SQL request: ${e}`);
    }
  }

  async put(id: number, element: Put<T>): Promise<T> {
    try {
      const mapEl = this.model.put(element);
      return await this.db.query(this._UPDATE_BY_ID, [mapEl, id]);
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: put(); `, e);
      throw new Error(`Something wrong the SQL request: ${e}`);
    }
  }

  async delete(id: number): Promise<unknown> {
    try {
      return await this.db.query(this._DELETE_BY_ID, id);
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: delete()`, e);
      throw new Error(`Something wrong the SQL request: ${e}`);
    }
  }
}
