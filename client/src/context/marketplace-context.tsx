import type { IMarketplaceContext } from "@/interfaces/context";
import { createContext } from "react";

export const MarketplaceContext = createContext<IMarketplaceContext>({
  marketplaceItems: [],
  addressMP: null,
  account: null,
  userItems: [],
  items: [],
  loading: false,
  error: false,
  progress: 0,
  purchaseNFT: async () => false,
  relistNFT: async () => false,
  createNFT: async () => null,
  getAccount: async () => {},
  getNFT: () => null,

  // FILTERS & ORDERS
  onFilterByRarity: () => {},
  updateItemsOrder: () => {},

  onFilterByStatusUserItems: () => {},
  onFilterByRarityUsers: () => {},
  updateItemsOrderUsers: () => {},
});
