import { AbstractModel } from "../core/abstract.model";
import { UserSocialNetwork } from "../interfaces/user-social-network.interface";
import { DbPut, DbSave, UserSocialNetworkDb } from "../interfaces/db";
import { Put, Save } from "../interfaces/http-request";

export class SocialNetworkModel extends AbstractModel<UserSocialNetwork, UserSocialNetworkDb> {
  protected mapPutJSONToDb(element: Put<UserSocialNetwork>): DbPut<UserSocialNetworkDb> {
    return {
      profile_url: element?.profileUrl,
      updated_at: this.setUpdateAt()
    };
  }

  protected mapSaveJSONToDb(element: Save<UserSocialNetwork>): DbSave<UserSocialNetworkDb> {
    return {
      social_network_id: element.socialNetworkId,
      user_id: element.userId,
      profile_url: element.profileUrl
    };
  }

}
