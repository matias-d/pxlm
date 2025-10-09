import type { IPxl } from "./pxl";

export interface IMarketplaceContext {
  account: IUser | null;
  addressMP: string | null;
  userItems: IPxl[];
  marketplaceItems: IPxl[];

  loading: boolean;
  progress: number;
  error: boolean;

  createNFT: (pxl: IPxlCreate) => Promise<IPxl | null>;
  getNFT: (tokenId: number) => IPxl | null;
  purchaseNFT: (itemId: number) => Promise<boolean>;
  relistNFT: (tokenId: number, price: string) => Promise<boolean>;
  onFilterByRarity: (rarity: string) => void;
  updateItemsOrder: (
    order: "low-to-high" | "high-to-low",
    items: IPxl[]
  ) => void;

  onFilterByStatusUserItems: (
    status: "all" | "sold" | "purchased" | "relist"
  ) => void;

  getAccount: () => Promise<void>;
}
