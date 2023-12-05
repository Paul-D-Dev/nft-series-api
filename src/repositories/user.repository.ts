import { AbstractRepository } from "../core/abstract.repository";
import { User, UserJSON } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { AbstractModel } from "../core/abstract.model";
import { UserModel } from "../models/user.model";
import { TablesEnum } from "../enums/tables.enum";

export class UserRepository extends AbstractRepository<User, UserJSON, UserDb> {
  constructor() {
    super(TablesEnum.USERS);
  }

  model: AbstractModel<User, UserDb> = new UserModel();

}
