import { AbstractRepository } from "../core/abstract.repository";
import { TablesEnum }         from "../enums/tables.enum";
import { Production }         from "../interfaces/production.interface";

export class CollectionRepository extends AbstractRepository<Production> {
  constructor() {
    super(TablesEnum.PRODUCTIONS);
  }
}
