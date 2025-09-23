import type { Action, IMarketplaceState, UpdateStateI } from "./reducer";
import type { IPxl } from "@/interfaces/pxl";

export const initialState: IMarketplaceState = {
  status: { loading: false, error: false },
  order: "low-to-high",
  account: null,
  baseItems: [],
  items: [],
};

function applyPriceOrder(
  items: IPxl[],
  order: "low-to-high" | "high-to-low"
): IPxl[] {
  const rarityRank: Record<string, number> = {
    common: 1,
    uncommon: 2,
    rare: 3,
    epic: 4,
    legendary: 5,
  };

  return [...items].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    if (priceA === priceB) {
      const rarityA = rarityRank[a.rarity_tier.toLowerCase()] ?? 0;
      const rarityB = rarityRank[b.rarity_tier.toLowerCase()] ?? 0;
      return rarityB - rarityA;
    }

    return order === "low-to-high" ? priceA - priceB : priceB - priceA;
  });
}

const UPDATE_STATE_BY_ACTION: UpdateStateI = {
  SET_ACCOUNT: (state, action) => {
    return { ...state, account: action.payload };
  },
  SET_LOADING: (state, action) => {
    return { ...state, status: { ...state.status, loading: action.payload } };
  },
  SET_ERROR: (state, action) => {
    return { ...state, status: { ...state.status, error: action.payload } };
  },
  SET_ITEMS: (state, action) => {
    const order = "low-to-high";
    const sorted = applyPriceOrder(action.payload, order);
    return { ...state, items: sorted, baseItems: sorted, order };
  },
  FILTER_BY_RARITY: (state, action) => {
    if (action.payload === "all") {
      const sorted = applyPriceOrder(state.baseItems, state.order);
      return { ...state, items: sorted };
    }

    const filtered = state.baseItems.filter(
      (item) => item.rarity_tier.toLowerCase() === action.payload.toLowerCase()
    );

    const sorted = applyPriceOrder(filtered, state.order);

    return { ...state, items: sorted };
  },
  SORT_BY_PRICE: (state, action) => {
    const sorted = applyPriceOrder(state.items, action.payload);
    return { ...state, items: sorted, order: action.payload };
  },
};

export function marketplaceReducer(state: IMarketplaceState, action: Action) {
  const { type } = action;
  const updateState = UPDATE_STATE_BY_ACTION[type as keyof UpdateStateI];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return updateState ? updateState(state, action as any) : state;
}
