import type { IMarketplaceContext } from "@/interfaces/context";
import { createContext } from "react";

export const MarketplaceContext = createContext<IMarketplaceContext>({
  marketplaceItems: [],
  addressMP: null,
  account: null,
  userItems: [],
  loading: false,
  error: false,
  progress: 0,
  onFilterByStatusUserItems: () => {},
  purchaseNFT: async () => false,
  relistNFT: async () => false,
  createNFT: async () => null,
  getAccount: async () => {},
  updateItemsOrder: () => {},
  onFilterByRarity: () => {},
  getNFT: () => null,
});
