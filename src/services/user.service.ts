import { AbstractService } from "../core/abstract.service";
import { User, UserJSON } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { AbstractRepository } from "../core/abstract.repository";
import { UserRepository } from "../repositories/user.repository";

export class UserService extends AbstractService<User, UserJSON, UserDb> {
  protected repository: AbstractRepository<User, UserJSON, UserDb> = new UserRepository();
}
