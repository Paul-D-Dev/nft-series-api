import { Save } from "../interfaces/http-request";
import { PutUserSocialNetwork, UserSocialNetwork } from "../interfaces/user-social-network.interface";
import { UserSocialNetworkRepository } from "../repositories/user-social-network.repository";

export class UserSocialNetworkService {
  protected repository = new UserSocialNetworkRepository();

  async post(element: Save<UserSocialNetwork>): Promise<number> {
    try {
      return await this.repository.post(element);
    } catch (e) {
      console.log('SERVICE POST error: ', e);
      // @TODO catch error and map error to controller to render to the client
      throw e;
    }
  }

  async put(userId: number, socialId: number, element: PutUserSocialNetwork): Promise<any> {
    try {
      return await this.repository.put(userId, socialId, element);
    } catch (e) {
      throw e;
    }
  }

  async delete(userId: number, socialId: number): Promise<any> {
    try {
      return await this.repository.delete(userId, socialId);
    } catch (e) {
      throw e;
    }
  }
}
