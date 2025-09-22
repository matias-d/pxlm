import type { IAttribute } from "./attributes";

export interface IPxlCreate {
  url: string;
  attributes: IAttribute[];
  rarity_score: number;
  rarity_tier: string;
  price: number;
  bonuses: string[];
}

export interface IPxl {
  nftAddress: string;
  tokenId: number;
  seller: string;
  price: string;
  sold: boolean;

  name: string;
  description: string;
  image: string;
  attributes: IAttribute[];
  rarity_score: number;
  rarity_tier: string;
  generatedFrom: string;
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
