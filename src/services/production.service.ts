import { AbstractService } from "../core/abstract.service";
import { Production } from "../interfaces/production.interface";
import { ProductionRepository } from "../repositories/production.repository";

export class ProductionService extends AbstractService<Production> {
  protected repository = new ProductionRepository();

}
