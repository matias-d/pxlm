import type { IPxl } from "./pxl";

export interface IMarketplaceContext {
  account: IUser | null;
  addressMP: string | null;
  userItems: IPxl[];
  items: IPxl[];

  loading: boolean;
  progress: number;
  error: boolean;

  createNFT: (pxl: IPxlCreate) => Promise<IPxl | null>;
  getNFT: (tokenId: number) => Promise<IPxl | null>;
  purchaseNFT: (tokenId: number) => Promise<void>;
  relistNFT: (tokenId: number, price: string) => Promise<void>;
  onFilterByRarity: (rarity: string) => void;
  updateItemsOrder: (
    order: "low-to-high" | "high-to-low",
    items: IPxl[]
  ) => void;

  onFilterByStatusUserItems: (
    status: "all" | "sold" | "purchase" | "relist"
  ) => void;

  getAllUserNfts: () => Promise<void>;
  getAccount: () => Promise<void>;
}
