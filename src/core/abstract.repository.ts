import { TablesEnum } from "../enums/tables.enum";
import { DbHandler } from "../repositories/db.handler";
import { AbstractModel } from "./abstract.model";
import { Put, Save } from "../interfaces/http-request";
import { Conditional } from "../types";
import { ResultSetHeader } from "mysql2";
import { CustomError } from "../models/custom-error.model";
import { handleCatchError } from "../utils/handleCatchError";

/**
 * - T: Type we will return to the client
 * - DB: Type we will register in the DB
 * - P: Type for the request Post or Put, if P = void then we will use T
 */
export abstract class AbstractRepository<T, DB, P = void> {
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
  protected readonly _POST: string;
  private readonly _UPDATE_BY_ID: string;
  private readonly _DELETE_BY_ID: string;
  abstract readonly model: AbstractModel<Conditional<P, T>, DB>;


  async findAll(): Promise<T[]> {
    try {
      return await this.db.query(this.GET_ALL);
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: findAll() `, e);
      throw handleCatchError(e);
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      const results: T[] = await this.db.query(this.GET_BY_ID, id);
      if (results.length === 0) {
        console.error('Abstract Repository - CAN NOT FIND THE ITEM WITH ID: ', id);
        throw new CustomError(404, 'CAN NOT FIND THE ELEMENT');
      }
      return results[0];
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: findById `, e);
      throw handleCatchError(e);
    }
  }

  async post(element: Save<Conditional<P, T>>): Promise<number> {
    try {
      const mapEl = this.model.save(element);
      const result: ResultSetHeader = await this.db.query(this._POST, mapEl);
      return result.insertId;
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: post()`, e);
      throw handleCatchError(e);
    }
  }

  async put(id: number, element: Put<Conditional<P, T>>): Promise<unknown> {
    try {
      const mapEl = this.model.put(element);
      return await this.db.query(this._UPDATE_BY_ID, [mapEl, id]);
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: put(); `, e);
      throw handleCatchError(e);
    }
  }

  async delete(id: number): Promise<unknown> {
    try {
      const result: ResultSetHeader = await this.db.query(this._DELETE_BY_ID, id);
      if (result.affectedRows === 0) {
        console.error('Abstract Repository - CAN NOT FIND THE ITEM WITH ID: ', id);
        throw new CustomError(404, 'CAN NOT FIND THE ELEMENT');
      }
      return result;
    } catch (e) {
      console.error(`FILE AbstractRepository; table: ${this.table}; request: delete()`, e);
      throw handleCatchError(e);
    }
  }
}
