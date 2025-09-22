/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialState, marketplaceReducer } from "./marketplace-reducer";
import {
  _createNFT,
  _getAccount,
  _getNFT,
  getAllNFTs,
  type CreateNFTResult,
} from "../services/contracts";
import { createContext, useEffect, useReducer, useState } from "react";
import { steps } from "@/helpers/consts/steps-progress";
import type { IPxl, IPxlCreate } from "@/interfaces/pxl";
import type { IUser } from "../interfaces/user";
import { toast } from "sonner";

interface IMarketplaceContext {
  account: IUser | null;
  items: IPxl[];
  loading: boolean;
  progress: number;
  error: boolean;

  createNFT: (pxl: IPxlCreate) => Promise<CreateNFTResult | undefined>;
  getNFT: (tokenId: number) => Promise<IPxl | null>;
  getAccount: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const MarketplaceContext = createContext<IMarketplaceContext>({
  account: null,
  loading: false,
  items: [],
  error: false,
  progress: 0,
  createNFT: async () => undefined,
  getAccount: async () => {},
  getNFT: async () => null,
});

export default function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      if (!state.account?.signer) return;
      onLoading(true);
      try {
        const result = await getAllNFTs(state.account?.signer);
        dispatch({ type: "SET_ITEMS", payload: result });
      } catch (error: any) {
        console.error("❌ Error while getting all nfts:", error);
        messageError(error as Error, "get all nfts");
        onError(true);
      } finally {
        onLoading(false);
      }
    })();
  }, [state.account?.signer]);

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
      console.error("❌ Error while getting account:", error);
      messageError(error as Error, "get account");
      onError(true);
    } finally {
      onLoading(false);
    }
  };

  const createNFT = async (
    pxl: IPxlCreate
  ): Promise<CreateNFTResult | undefined> => {
    setProgress(0);
    try {
      const result = await _createNFT({
        pxl,
        signer: state.account!.signer,
        address: state.account!.address,
        onStepChange,
      });

      toast.success("🎉 NFT created and listed successfully!", {
        id: "nft-progress",
      });

      return result;
    } catch (error) {
      console.error("❌ Error while creating NFT:", error);
      messageError(error as Error, "create NFT");
    } finally {
      setProgress(0);
    }
  };

  const getNFT = async (tokenId: number): Promise<IPxl | null> => {
    try {
      const result = await _getNFT(tokenId, state.account!.signer);
      return result;
    } catch (error) {
      console.error("❌ Error while getting NFT:", error);
      messageError(error as Error, "get NFT");
      return null;
    }
  };

  const onStepChange = (currentStep: number) => {
    const { label, percent } = steps[currentStep];
    setProgress(percent);
    toast.loading(label, { id: "nft-progress" });
  };

  const messageError = (error: Error, functionAction: string) => {
    const message =
      error instanceof Error && error.message
        ? `Failed to ${functionAction}: ${error.message}`
        : `An unexpected error occurred while ${functionAction}.`;

    toast.error(message);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        loading: state.status.loading,
        error: state.status.error,
        account: state.account,
        items: state.items,
        getAccount,
        createNFT,
        progress,
        getNFT,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}
