import { DbPut, DbSave } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export abstract class AbstractModel<T, Db> {
  abstract saveJSONToDb(element: Save<T>): DbSave<Db>;

  /**
   * When we return the object to store in DB, it does not remove the undefined value
   * TODO try to find a way to remove undefined values
   * @param element is a Partial
   * @return object with undefined values
   */
  abstract putJSONToDb(element: Put<T>): DbPut<Db>
}
