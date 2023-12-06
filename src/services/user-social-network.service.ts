import { UserSocialNetworkRepository } from "../repositories/user-social-network.repository";
import { UserSocialNetwork } from "../interfaces/user-social-network.interface";

export class UserSocialNetworkService {
  repository = new UserSocialNetworkRepository();

  async post(element: UserSocialNetwork): Promise<any> {
    try {
      return this.repository.post(element);
    } catch (e) {
      console.log('SERVICE POST error: ', e);
      // @TODO catch error and map error to controller to render to the client
      throw e;
    }
  }

  async put(userId: number, socialId: number, element: any): Promise<any> {
    return await this.repository.put(userId, socialId, element);
  }

  async delete(userId: number, socialId: number): Promise<any> {
    try {
      return await this.repository.delete(userId, socialId);
    } catch (e) {
      throw e;
    }
  }
}
