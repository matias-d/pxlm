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

  cart: [],
};

const UPDATE_STATE_BY_ACTION: UpdateStateI = {
  SET_ACCOUNT: (state, action) => {
    return { ...state, account: action.payload };
  },

  // Handle loading
  SET_LOADING: (state, action) => {
    return { ...state, status: { ...state.status, loading: action.payload } };
  },

  // Handle error
  SET_ERROR: (state, action) => {
    return { ...state, status: { ...state.status, error: action.payload } };
  },

  // Set items and base items
  SET_ITEMS: (state, action) => {
    const order = "low-to-high";
    const sorted = applyPriceOrder(action.payload, order);
    return { ...state, items: sorted, baseItems: sorted, order };
  },

  // Set items in userItems and baseUserItems
  SET_USER_ITEMS: (state, action) => {
    const order = "low-to-high";
    const sorted = applyPriceOrder(action.payload, order);
    return { ...state, userItems: sorted, baseUserItems: sorted, order };
  },

  // Filter items by rarity
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

  // Sort items by low and hight price
  SORT_BY_PRICE: (state, action) => {
    const sorted = applyPriceOrder(state.items, action.payload);
    return { ...state, items: sorted, order: action.payload };
  },

  // Filter user items by status (sold, purchased or all)
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
  SET_CART: (state, action) => {
    const cartUpdated = [...state.cart, action.payload];
    return { ...state, cart: cartUpdated };
  },
};

export function marketplaceReducer(state: IMarketplaceState, action: Action) {
  const { type } = action;
  const updateState = UPDATE_STATE_BY_ACTION[type as keyof UpdateStateI];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return updateState ? updateState(state, action as any) : state;
}
