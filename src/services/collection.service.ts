import { CollectionRepository } from "../repositories/collection.repository";

export class CollectionService {
  private readonly _repository = new CollectionRepository();

  async getCollectionById(id: number) {
    return await this._repository.findById(id);
  }
}
