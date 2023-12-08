import { Image } from "./image.interface";
import { User } from "./user.interface";

export interface Production {
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
