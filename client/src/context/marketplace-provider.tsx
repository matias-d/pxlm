/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  initialState,
  marketplaceReducer,
} from "./reducer/marketplace-reducer";
import {
  _createNFT,
  _getAccount,
  _getAllUserNfts,
  _getNFT,
  _purchaseNFT,
  getAllNFTs,
} from "../services/contracts";
import { createNFTToastController } from "@/utils/create-nft-toast-controller";
import { MarketplaceContext } from "./marketplace-context";
import { useEffect, useReducer, useState } from "react";
import type { IPxl, IPxlCreate } from "@/interfaces/pxl";
import { steps } from "@/helpers/consts/steps-progress";
import { toast } from "sonner";

const toastController = createNFTToastController();

export default function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);
  const [progress, setProgress] = useState(0);

  // === Get all NFTs Marketplace ===
  useEffect(() => {
    (async () => {
      if (!state.account?.signer)
        throw new Error(
          "Wallet not connected. Please connect your wallet to continue."
        );
      onLoading(true);
      try {
        const result = await getAllNFTs(state.account?.signer);
        updateItems({ items: result });
      } catch (error: any) {
        console.error("❌ Error while getting all nfts:", error);
        messageError(error as Error, "get all nfts");
        onError(true);
      } finally {
        onLoading(false);
      }
    })();
  }, [state.account?.signer]);

  // === Actions NFT ===
  const createNFT = async (pxl: IPxlCreate): Promise<IPxl | null> => {
    setProgress(0);
    toastController.start("🎨 Starting NFT creation...");
    try {
      const result = await _createNFT({
        pxl,
        signer: state.account!.signer,
        address: state.account!.address,
        onStepChange: (currentStep) => {
          const { label, percent } = steps[currentStep];
          setProgress(percent);
          toastController.update(label, percent);
        },
      });

      toastController.success("🎉 NFT created successfully!");

      if (result) updateItems({ items: [result, ...state.items] });

      return result;
    } catch (error) {
      console.error("❌ Error while creating NFT:", error);
      messageError(error as Error, "create NFT");
      return null;
    } finally {
      setProgress(0);
    }
  };

  const purchaseNFT = async (tokenId: number) => {
    try {
      const { buyer } = await _purchaseNFT({
        tokenId,
        signer: state.account!.signer,
      });

      const updated = state.baseItems.map((item) =>
        item.tokenId === tokenId ? { ...item, sold: true, owner: buyer } : item
      );

      updateItems({ type: "SET_USER_ITEMS", items: updated });
      updateItems({ items: updated });
    } catch (error) {
      console.error("❌ Error while purchasing NFT:", error);
      messageError(error as Error, "purchase NFT");
    }
  };

  // === Getters ===
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

  const getAllUserNfts = async () => {
    onLoading(true);
    if (!state.account?.signer)
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );

    try {
      const result = await _getAllUserNfts(
        state.account?.address,
        state.account?.signer
      );
      updateItems({ type: "SET_USER_ITEMS", items: result });
    } catch (error: any) {
      console.error("❌ Error while getting all user nfts:", error);
      messageError(error as Error, "get all user nfts");
      onError(true);
    } finally {
      onLoading(false);
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

  // === Handle filters & sorting ===
  const updateItemsOrder = (order: "low-to-high" | "high-to-low") => {
    dispatch({ type: "SORT_BY_PRICE", payload: order });
  };

  const onFilterByRarity = (rarity: string) => {
    dispatch({ type: "FILTER_BY_RARITY", payload: rarity });
  };

  const onFilterByStatusUserItems = (status: "all" | "sold" | "purchase") => {
    dispatch({ type: "FILTER_BY_STATUS_USER_ITEMS", payload: status });
  };

  // === Util reducer functions ===
  const updateItems = ({
    type = "SET_ITEMS",
    items,
  }: {
    type?: "SET_ITEMS" | "SET_USER_ITEMS";
    items: IPxl[];
  }) => dispatch({ type: type, payload: items });

  const onLoading = (value: boolean) =>
    dispatch({ type: "SET_LOADING", payload: value });

  const onError = (value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: value });

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
        userItems: state.userItems,
        error: state.status.error,
        onFilterByStatusUserItems,
        account: state.account,
        items: state.items,
        updateItemsOrder,
        onFilterByRarity,
        getAllUserNfts,
        purchaseNFT,
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
