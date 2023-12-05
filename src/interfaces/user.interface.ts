import { Image } from "./image.interface";
import { SocialNetwork } from "./social-network.interface";

export interface User {
  id: string;
  name: string;
  nameSeo: string | null;
  bio: string | null;
  isVerified: boolean;
  contractAddress: string | null;
  imageId: number | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserJSON {
  id: string;
  name: string;
  nameSeo: string | null;
  bio: string | null;
  isVerified: boolean;
  contractAddress: string | null;
  image: Image | null;
  createdAt: string;
  updatedAt: string | null;
  socialNetworks: SocialNetwork[];
}
