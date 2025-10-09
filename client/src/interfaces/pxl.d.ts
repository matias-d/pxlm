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
  buyer: string;
  boughtAt: number;
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

  previousListings?: PreviousListings[];
}

export interface PreviousListings {
  price: string;
  seller: string;
  sold: boolean;
  itemId: number;
  buyer: string;
  boughtAt: number;
  type: "sale" | "listing";
}

type RawListing = [
  bigint, // itemId
  string, // seller
  string, // buyer
  bigint, // price
  bigint, // boughtAt
  boolean // sold
];

export interface IPxlContract {
  nft: string;
  itemId: string;
  tokenId: string;
  price: string;
  seller: string;
  sold: boolean;
  tokenURI: string;
  buyer: string;
  boughtAt: number;
  history: RawListing[];
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
