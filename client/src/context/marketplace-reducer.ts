import type { IMarketplaceState } from "../interfaces/marketplace.d.state";
import type { IUser } from "../interfaces/user";

export const initialState: IMarketplaceState = {
  account: null,
  status: { loading: false, error: false },
  items: [],
};
export type Action =
  | { type: "SET_ACCOUNT"; payload: IUser }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean };

export type functionUpdate<T extends Action> = (
  state: IMarketplaceState,
  action: T
) => IMarketplaceState;

export interface UpdateStateI {
  SET_ACCOUNT: functionUpdate<Extract<Action, { type: "SET_ACCOUNT" }>>;
  SET_LOADING: functionUpdate<Extract<Action, { type: "SET_LOADING" }>>;
  SET_ERROR: functionUpdate<Extract<Action, { type: "SET_ERROR" }>>;
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
};

export function marketplaceReducer(state: IMarketplaceState, action: Action) {
  const { type } = action;
  const updateState = UPDATE_STATE_BY_ACTION[type as keyof UpdateStateI];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return updateState ? updateState(state, action as any) : state;
}
