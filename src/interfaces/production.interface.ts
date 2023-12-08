import { Image } from "./image.interface";
import { User } from "./user.interface";

interface _Production<UserType, ImageType> {
  id: number;
  creator: UserType;
  royaltyFees: number;
  title: string;
  nameSeo: string;
  releaseYear: number;
  image: ImageType | null;
  createdAt: string;
  updateAt: string | null;
}

export type Production = _Production<User, Image>;
export type ProductionToDb = _Production<Pick<User, 'id'>, Pick<Image, 'id'>>
