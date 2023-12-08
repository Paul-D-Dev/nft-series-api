import { AbstractService } from "../core/abstract.service";
import { Production, ProductionToDb } from "../interfaces/production.interface";
import { ProductionRepository } from "../repositories/production.repository";
import { ProductionDb } from "../interfaces/db";

export class ProductionService extends AbstractService<Production, ProductionDb, ProductionToDb> {
  protected repository = new ProductionRepository();

}
