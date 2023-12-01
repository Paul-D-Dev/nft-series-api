import { AbstractRepository } from "../core/abstract.repository";
import { TablesEnum }         from "../enums/tables.enum";

export class CollectionRepository extends AbstractRepository<any> {
  constructor() {
    super(TablesEnum.PRODUCTIONS);
  }
}
