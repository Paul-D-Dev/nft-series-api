import { AbstractService } from "../core/abstract.service";
import { User } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { AbstractRepository } from "../core/abstract.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserService extends AbstractService<User, UserDb> {
  protected repository: AbstractRepository<User, UserDb> = new UserRepository();
}
