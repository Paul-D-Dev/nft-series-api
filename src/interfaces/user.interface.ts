import { Image } from "./image.interface";
import { SocialNetwork } from "./social-network.interface";

interface _User<ImageType> {
  id: number;
  name: string;
  nameSeo: string | null;
  bio: string | null;
  isVerified: boolean;
  contractAddress: string | null;
  image: ImageType | null;
  createdAt: string;
  updatedAt: string | null;
  socialNetworks: SocialNetwork[];
}

export type User = _User<Image>;
export type UserToDb = _User<Pick<Image, 'id'>>;
