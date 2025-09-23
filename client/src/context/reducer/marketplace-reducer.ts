import type { Action, IMarketplaceState, UpdateStateI } from "./reducer";
import {
  applyPriceOrder,
  filterPurchasedItems,
  filterSoldItems,
} from "./functions-utils";

export const initialState: IMarketplaceState = {
  status: { loading: false, error: false },
  order: "low-to-high",
  account: null,
  baseItems: [],
  items: [],

  userItems: [],
  baseUserItems: [],
};

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
  SET_USER_ITEMS: (state, action) => {
    const order = "low-to-high";
    const sorted = applyPriceOrder(action.payload, order);
    return { ...state, userItems: sorted, baseUserItems: sorted, order };
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

  FILTER_BY_STATUS_USER_ITEMS: (state, action) => {
    if (!state.account?.address) return { ...state };

    if (action.payload === "all") {
      const sorted = applyPriceOrder(state.baseUserItems, state.order);
      return { ...state, userItems: sorted };
    }

    if (action.payload === "sold") {
      const filtered = filterSoldItems(state.baseItems, state.account?.address);

      const sorted = applyPriceOrder(filtered, state.order);
      return { ...state, userItems: sorted };
    }

    const filtered = filterPurchasedItems(
      state.baseItems,
      state.account?.address
    );
    const sorted = applyPriceOrder(filtered, state.order);

    return { ...state, userItems: sorted };
  },
};

export function marketplaceReducer(state: IMarketplaceState, action: Action) {
  const { type } = action;
  const updateState = UPDATE_STATE_BY_ACTION[type as keyof UpdateStateI];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return updateState ? updateState(state, action as any) : state;
}
