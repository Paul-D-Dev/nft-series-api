import { Image } from "./image.interface";
import { User } from "./user.interface";

export interface Production {
  id: number;
  creatorId: number;
  royaltyFees: number;
  title: string;
  nameSeo: string;
  releaseYear: number;
  imageId: number;
  createdAt: string;
  updateAt: string | null;
}

export interface ProductionJSON {
  id: number;
  creator: User;
  royaltyFees: number;
  title: string;
  nameSeo: string;
  releaseYear: number;
  image: Image | null;
  createdAt: string;
  updateAt: string | null;
}
