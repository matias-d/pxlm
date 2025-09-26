import type { IMarketplaceContext } from "@/interfaces/context";
import { createContext } from "react";

export const MarketplaceContext = createContext<IMarketplaceContext>({
  addressMP: null,
  account: null,
  userItems: [],
  items: [],
  loading: false,
  error: false,
  progress: 0,
  onFilterByStatusUserItems: () => {},
  getAllUserNfts: async () => {},
  purchaseNFT: async () => {},
  relistNFT: async () => {},
  createNFT: async () => null,
  getAccount: async () => {},
  updateItemsOrder: () => {},
  onFilterByRarity: () => {},
  getNFT: async () => null,
});
