import { AbstractService } from "../core/abstract.service";
import { Production, ProductionJSON } from "../interfaces/production.interface";
import { ProductionRepository } from "../repositories/production.repository";
import { ProductionDb } from "../interfaces/db";

export class ProductionService extends AbstractService<Production, ProductionJSON, ProductionDb> {
  protected repository = new ProductionRepository();

}
