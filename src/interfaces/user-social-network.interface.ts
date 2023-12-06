import { SocialNetwork } from "./social-network.interface";

export interface UserSocialNetwork extends SocialNetwork {
  userId: number;
}

export type PutUserSocialNetwork = Omit<UserSocialNetwork, 'socialNetworkId' | 'userId' | 'name'>;
