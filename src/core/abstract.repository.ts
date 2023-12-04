import { TablesEnum } from "../enums/tables.enum";
import { DbHandler } from "../repositories/db.handler";

export abstract class AbstractRepository<T> {
  protected constructor(table: TablesEnum) {
    this.table = table;
    this.GET_ALL = `SELECT *
                    FROM ${table}`;
    this.GET_BY_ID = `SELECT *
                      FROM ${table}
                      WHERE id = ?;`;
    this._POST = `INSERT INTO ${table}
                  SET ?;`;
    this._UPDATE_BY_ID = `UPDATE ${table} WHERE id = ?;`;
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


  async findAll(): Promise<T[]> {
    const result: T[] = await this.db.query(this.GET_ALL);
    return Promise.all(result);
  }

  async findById(id: number): Promise<T | null> {
    try {
      const result: T[] = await this.db.query(this.GET_BY_ID, id);
      return result[0] || null;
    } catch (e) {
      // TODO error sql queries
      console.error(`${this.table} findById `, e);
      throw new Error('error');
    }
  }

  post(element: T): Promise<T> {
    return this.db.query(this._POST, element);
  }
}
