import { DbPut, DbSave } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";
import { removedUndefinedValueInObject } from "../utils/removedUndefinedValueInObject";

export abstract class AbstractModel<T, Db> {
  abstract saveJSONToDb(element: Save<T>): DbSave<Db>;

  /**
   * When we return the object to store in DB, it does not remove the undefined value
   * TODO try to find a way to remove undefined values
   * TODO update with protected abstract
   * TODO finally just use put
   * @param element is a Partial
   * @return object with undefined values
   */
  abstract putJSONToDb(element: Put<T>): DbPut<Db>

  protected setUpdateAt(): string {
    return new Date().toISOString().slice(0, 19).replace('T', ' ');
  }

  put(element: Put<T>): DbPut<Db> {
    const mapEl = this.putJSONToDb(element);
    // @ts-ignore
    return removedUndefinedValueInObject(mapEl);
  }


}
