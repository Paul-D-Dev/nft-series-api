import { UserSocialNetworkRepository } from "../repositories/user-social-network.repository";

export class UserSocialNetworkService {
  repository = new UserSocialNetworkRepository();

  //@TODO post

  async put(userId: number, socialId: number, element: any): Promise<any> {
    return await this.repository.put(userId, socialId, element);
  }

  //@TODO delete
}
