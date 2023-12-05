import { AbstractModel } from "../core/abstract.model";
import { User } from "../interfaces/user.interface";
import { UserDb } from "../interfaces/db/user-db.interface";
import { Put, Save } from "../interfaces/http-request";
import { DbPut, DbSave } from "../interfaces/db";

export class UserModel extends AbstractModel<User, UserDb> {
  putJSONToDb(element: Put<User>): DbPut<UserDb> {
    return {
      name: element?.name,
      name_seo: element?.nameSeo,
      bio: element?.bio,
      is_verified: element?.isVerified,
      contract_address: element?.contractAddress,
      image_id: element?.imageId,
      updated_at: this.setUpdateAt()
    };
  }

  saveJSONToDb(element: Save<User>): DbSave<UserDb> {
    return {
      name: element.name,
      name_seo: element.nameSeo,
      bio: element.bio,
      is_verified: false,
      contract_address: element.contractAddress,
      image_id: element.imageId
    };
  }

}
