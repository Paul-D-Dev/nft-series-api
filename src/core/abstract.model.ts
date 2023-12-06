import { DbPut, DbSave } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";
import { removedUndefinedValueInObject } from "../utils/removedUndefinedValueInObject";

export abstract class AbstractModel<T, Db> {
  /**
   * Map element to save from front end to store in the DB
   * @param element to save come from Front end
   * @return element to save in DB with snake_case format
   */
  protected abstract mapSaveJSONToDb(element: Save<T>): DbSave<Db>;

  /**
   * Map element to update from the front end to store in the DB
   * @param element is a Partial element come from the Front end
   * @return Object with undefined values
   */
  protected abstract mapPutJSONToDb(element: Put<T>): DbPut<Db>

  protected setUpdateAt(): string {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  put(element: Put<T>): DbPut<Db> {
    const mapEl = this.mapPutJSONToDb(element);
    // @TODO try to fix to remove ts-ignore
    // @ts-ignore
    return removedUndefinedValueInObject(mapEl);
  }

  save(element: Save<T>): DbSave<Db> {
    return this.mapSaveJSONToDb(element);
  }


}
