import { DbPut, DbSave } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export abstract class AbstractModel<T, Db> {
  abstract saveJSONToDb(element: Save<T>): DbSave<Db>;

  abstract putJSONToDb(element: Put<T>): DbPut<Db>
}
