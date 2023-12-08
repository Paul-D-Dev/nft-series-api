import { AbstractService } from "../core/abstract.service";
import { User, UserToDb } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { UserRepository } from "../repositories/user.repository";

export class UserService extends AbstractService<User, UserDb, UserToDb> {
  protected repository = new UserRepository();
}
