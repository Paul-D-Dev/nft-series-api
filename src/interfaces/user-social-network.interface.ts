import { SocialNetwork } from "./social-network.interface";

export interface UserSocialNetwork extends SocialNetwork {
  userId: number;
}

// @TODO omit name
export type PutUserSocialNetwork = Omit<UserSocialNetwork, 'socialNetworkId' | 'userId'>;
