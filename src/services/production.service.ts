import { ProductionRepository } from "../repositories/production.repository";

export class ProductionService {
  private readonly _repository = new ProductionRepository();

  async getCollectionById(id: number) {
    return await this._repository.findById(id);
  }
}
