import { INftType } from "./nft-type.interface";
import { ProductionJSON } from "./production.interface";
import { UserJSON } from "./user.interface";
import { Image } from "./image.interface";

export interface INft {
  id: number;
  typeId: number;
  name: string;
  contractAddress: string;
  imageId: number;
  nameSeo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  characterId: number | null;
  season: string | null;
  moment: string | null;
  productionId: number;
  creatorId: number;
  currentOwnerId: number;
  isTradeable: boolean;
  floorPrice: number;
  currentSalePrice: number;
  topPrice: number;
  lastSalePrice: number;
  totalSales: number;
  tokenId: string;
  chain: string;
  currency: string;
}

export interface INftJSON {
  id: number;
  type: INftType;
  name: string;
  contractAddress: string;
  image: Image;
  nameSeo: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  character: INft | null;
  season: string | null;
  moment: string | null;
  production: ProductionJSON;
  creator: UserJSON;
  currentOwner: UserJSON;
  isTradeable: boolean;
  floorPrice: number;
  currentSalePrice: number;
  topPrice: number;
  lastSalePrice: number;
  totalSales: number;
  tokenId: string;
  chain: string;
  currency: string;
}
