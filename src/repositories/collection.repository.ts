import { DbHandler } from "./db.handler";

export class CollectionRepository {
  protected readonly db: DbHandler;
  protected GET_BY_ID = 'SELECT * FROM collection WHERE id = ?;'

  constructor() {
    this.db = DbHandler.getInstance();
  }

  async findById(id: number): Promise<any> {
    const collection = await this.db.query(this.GET_BY_ID, id);
    return collection || null;
  }
}
