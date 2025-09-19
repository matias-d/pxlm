/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState, marketplaceReducer } from "./marketplace-reducer";
import { _getAccount } from "../services/contracts";
import { createContext, useReducer } from "react";
import type { IUser } from "../interfaces/user";
import { toast } from "sonner";

interface IMarketplaceContext {
  loading: boolean;
  error: boolean;
  account: IUser | null;

  getAccount: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MarketplaceContext = createContext<IMarketplaceContext>({
  account: null,
  loading: false,
  error: false,
  getAccount: async () => {},
});

export default function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  const onLoading = (value: boolean) =>
    dispatch({ type: "SET_LOADING", payload: value });

  const onError = (value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: value });

  const getAccount = async (): Promise<void> => {
    try {
      onLoading(true);
      const account = await _getAccount();
      dispatch({
        type: "SET_ACCOUNT",
        payload: account,
      });
    } catch (error: any) {
      console.error("Get account ERROR: ", error);
      toast.error(
        "An error occurred while getting the account: ",
        error.message
      );
      onError(true);
    } finally {
      onLoading(false);
    }
  };

  return (
    <MarketplaceContext.Provider
      value={{
        account: state.account,
        error: state.status.error,
        loading: state.status.loading,
        getAccount,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}
