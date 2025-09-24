import type { IAttribute } from "./attributes";

export interface IPxlCreate {
  url: string;
  attributes: IAttribute[];
  rarity_score: number;
  rarity_tier: string;
  price: number;
  bonuses: string[];
  addedPrices: { bonus: number; name: string; color: string }[];
}

export interface IPxl {
  itemId: number;
  nftAddress: string;
  tokenId: number;
  seller: string;
  price: string;
  sold: boolean;
  owner: string;

  name: string;
  description: string;
  image: string;
  attributes: IAttribute[];
  rarity_score: number;
  rarity_tier: string;
  generatedFrom: string;
  minted_at: number;
}

export interface IPxlContract {
  nft: string;
  itemId: string;
  tokenId: string;
  price: string;
  seller: string;
  sold: boolean;
  tokenURI: string;
}

export interface PinataPXLResponse {
  name: string;
  description: string;
  image: string;
  attributes: Attribute[];
  properties: Properties;
}

export interface Properties {
  tokenId: number;
  generated_from: string;
}
