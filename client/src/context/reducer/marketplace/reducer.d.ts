import type { IUser } from "@/interfaces/user";
import type { IPxl } from "@/interfaces/pxl";

interface IMarketplaceState {
  status: { loading: boolean; error: boolean };
  order: "low-to-high" | "high-to-low";
  marketplaceItems: IPxl[];
  account: IUser | null;
  baseItems: IPxl[];
  addressMP: string;
  items: IPxl[];

  baseUserItems: Ipxl[];
  userItems: IPxl[];
}
export type Action =
  | { type: "SET_ACCOUNT"; payload: IUser }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_ITEMS"; payload: IPxl[] }
  | { type: "SET_ITEMS_MARKETPLACE"; payload: IPxl[] }
  | { type: "SET_ADDRESS_MP"; payload: string }
  | { type: "SET_USER_ITEMS"; payload: IPxl[] }
  | { type: "FILTER_BY_RARITY"; payload: string }
  | {
      type: "FILTER_BY_STATUS_USER_ITEMS";
      payload: "all" | "sold" | "purchase" | "relist";
    }
  | { type: "SORT_BY_PRICE"; payload: "low-to-high" | "high-to-low" };
export type functionUpdate<T extends Action> = (
  state: IMarketplaceState,
  action: T
) => IMarketplaceState;

export interface UpdateStateI {
  SET_ACCOUNT: functionUpdate<Extract<Action, { type: "SET_ACCOUNT" }>>;
  SET_LOADING: functionUpdate<Extract<Action, { type: "SET_LOADING" }>>;
  SET_ERROR: functionUpdate<Extract<Action, { type: "SET_ERROR" }>>;
  SET_ITEMS: functionUpdate<Extract<Action, { type: "SET_ITEMS" }>>;
  SET_ITEMS_MARKETPLACE: functionUpdate<
    Extract<Action, { type: "SET_ITEMS_MARKETPLACE" }>
  >;
  SET_ADDRESS_MP: functionUpdate<Extract<Action, { type: "SET_ADDRESS_MP" }>>;
  SET_USER_ITEMS: functionUpdate<Extract<Action, { type: "SET_USER_ITEMS" }>>;
  FILTER_BY_RARITY: functionUpdate<
    Extract<Action, { type: "FILTER_BY_RARITY" }>
  >;
  FILTER_BY_STATUS_USER_ITEMS: functionUpdate<
    Extract<Action, { type: "FILTER_BY_STATUS_USER_ITEMS" }>
  >;
  SORT_BY_PRICE: functionUpdate<Extract<Action, { type: "SORT_BY_PRICE" }>>;
}
