import { DbSave } from "../interfaces/db";
import { Save } from "../interfaces/http-request";

export abstract class AbstractModel<T, Db> {
  abstract saveJSONToDb(element: Save<T>): DbSave<Db>;
}
