import { AbstractService } from "../core/abstract.service";
import { UserDb } from "../interfaces/db/user-db.interface";
import { Save } from "../interfaces/http-request";
import { Image } from "../interfaces/image.interface";
import { UserSocialNetwork } from "../interfaces/user-social-network.interface";
import { User, UserToDb } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/user.repository";
import { handleCatchError } from "../utils/handleCatchError";
import { ImageService } from "./image.service";
import { UserSocialNetworkService } from "./user-social-network.service";

export class UserService extends AbstractService<User, UserDb, UserToDb> {
  protected readonly repository = new UserRepository();
  private readonly _imageService = new ImageService();
  private readonly _userSocialNetworkService = new UserSocialNetworkService();

  async postWithImage(user: User, imageFile?: Express.Multer.File): Promise<number> {
    try {
      let userId: number;

      // Save Image
      if (user.image && imageFile) {
        const imageBody: Partial<Image> = {
          alt: user.image.alt
        };
        const imageId: number = await this._imageService.post(imageBody, imageFile.path);
        const newUser: UserToDb = {
          ...user,
          image: {
            id: imageId
          }
        };
        userId = await this.repository.post(newUser);
      } else {
        userId = await this.repository.post(user);
      }

      // Once user id inserted
      if (user.socialNetworks.length > 0 && userId > 0) {
        // Insert his social networks
        for (const social of user.socialNetworks) {
          const saveSocial: Save<UserSocialNetwork> = {
            socialNetworkId: social.socialNetworkId,
            userId: userId,
            profileUrl: social.profileUrl,
            name: social.name
          };
          await this._userSocialNetworkService.post(saveSocial);
        }
      }

      return userId;

    } catch (e) {
      return handleCatchError(e);
    }
  }
}
