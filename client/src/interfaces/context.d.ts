import type { IPxl } from "./pxl";

export interface IMarketplaceContext {
  account: IUser | null;
  addressMP: string | null;
  userItems: IPxl[];
  marketplaceItems: IPxl[];
  items: IPxl[];

  loading: boolean;
  progress: number;
  error: boolean;

  createNFT: (pxl: IPxlCreate) => Promise<IPxl | null>;
  getNFT: (tokenId: number) => IPxl | null;
  purchaseNFT: (itemId: number) => Promise<boolean>;
  relistNFT: (tokenId: number, price: string) => Promise<boolean>;
  getAccount: () => Promise<void>;

  onFilterByRarity: (rarity: string) => void;
  updateItemsOrder: (order: "low-to-high" | "high-to-low") => void;

  onFilterByRarityUsers: (rarity: string) => void;
  updateItemsOrderUsers: (order: "low-to-high" | "high-to-low") => void;
  onFilterByStatusUserItems: (
    status: "all" | "sold" | "purchased" | "relist"
  ) => void;
}
