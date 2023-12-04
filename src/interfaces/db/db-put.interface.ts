import { DbSave } from "./db-save.interface";

export type DbPut<I> = Partial<DbSave<I>>;
