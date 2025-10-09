import type { IPxl } from "@/interfaces/pxl";

interface ICart {
  status: { loading: boolean; error: boolean };
  cart: IPxl[];
  baseCart: IPxl[];
  active: boolean;
}

export const initialState: ICart = {
  status: { loading: false, error: false },
  active: false,
  cart: [],
  baseCart: [],
};

export type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_CART"; payload: IPxl }
  | { type: "REMOVE_CART"; payload: number }
  | { type: "CLEAR_CART"; payload: null };

export type functionUpdate<T extends Action> = (
  state: ICart,
  action: T
) => ICart;

export interface UpdateStateI {
  SET_LOADING: functionUpdate<Extract<Action, { type: "SET_LOADING" }>>;
  SET_ERROR: functionUpdate<Extract<Action, { type: "SET_ERROR" }>>;
  SET_CART: functionUpdate<Extract<Action, { type: "SET_CART" }>>;
  REMOVE_CART: functionUpdate<Extract<Action, { type: "REMOVE_CART" }>>;
  CLEAR_CART: functionUpdate<Extract<Action, { type: "CLEAR_CART" }>>;
}

const UPDATE_STATE_BY_ACTION: UpdateStateI = {
  // Handle loading
  SET_LOADING: (state, action) => {
    return { ...state, status: { ...state.status, loading: action.payload } };
  },

  // Handle error
  SET_ERROR: (state, action) => {
    return { ...state, status: { ...state.status, error: action.payload } };
  },

  // Handle set cart
  SET_CART: (state, action) => {
    const itemId = action.payload.itemId;

    const inCart = state.cart.some((pxl) => pxl.itemId === itemId);

    if (inCart) {
      const updatedState = UPDATE_STATE_BY_ACTION.REMOVE_CART(state, {
        payload: itemId,
        type: "REMOVE_CART",
      });
      return updatedState;
    }

    const cartUpdated = [...state.cart, action.payload];
    return { ...state, cart: cartUpdated, baseCart: cartUpdated, active: true };
  },
  REMOVE_CART: (state, action) => {
    const filtered = state.cart.filter(
      (item) => item.itemId !== action.payload
    );
    const isActive = filtered.length > 0;
    return { ...state, cart: filtered, active: isActive };
  },
  CLEAR_CART: (state) => {
    return { ...state, cart: [], baseCart: [], active: false };
  },
};

export function cartReducer(state: ICart, action: Action) {
  const { type } = action;
  const updateState = UPDATE_STATE_BY_ACTION[type as keyof UpdateStateI];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return updateState ? updateState(state, action as any) : state;
}
