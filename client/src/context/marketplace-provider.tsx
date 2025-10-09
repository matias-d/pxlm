/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  initialState,
  marketplaceReducer,
} from "./reducer/marketplace/marketplace-reducer";

import {
  _getAllUserNfts,
  _purchaseNFT,
  _createNFT,
  _getAccount,
  _relistNFT,
  getMarketplaceAddress,
  getAllNFTS,
} from "../services/contracts";
import { createNFTToastController } from "@/utils/create-nft-toast-controller";
import { filterRelistNFTs } from "./reducer/marketplace/functions-utils";
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
      if (!state.account?.signer) return;

      onLoading(true);
      try {
        const result = await getAllNFTS(state.account?.signer);
        updateItems({ items: result });
      } catch (error: any) {
        console.error("❌ Error while getting all nfts:", error);
        messageError("get all nfts");
        onError(true);
      } finally {
        onLoading(false);
      }
    })();
  }, [state.account?.signer]);

  // === Get Address Marketplace ===
  useEffect(() => {
    (async () => {
      const addressMP = await getMarketplaceAddress();

      if (!addressMP)
        throw new Error(
          "❌ Could not get the marketplace address. Check the ABI."
        );
      updateAddressMP(addressMP);
    })();
  }, []);

  // === Actions NFT ===
  const createNFT = async (pxl: IPxlCreate): Promise<IPxl | null> => {
    if (!state.account)
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );

    setProgress(0);
    toastController.start("🎨 Starting NFT creation...");
    try {
      const result = await _createNFT({
        pxl,
        signer: state.account.signer,
        address: state.account.address,
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
      messageError("create NFT");
      return null;
    } finally {
      setProgress(0);
    }
  };

  const relistNFT = async (tokenId: number, price: string): Promise<void> => {
    if (!state.account)
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );

    const nft = state.baseUserItems.find((item) => item.tokenId === tokenId);

    if (!nft)
      throw new Error(
        `NFT with token ID ${tokenId} not found in your items. Please make sure it exists before continuing.`
      );

    if (nft.owner !== state.account.address)
      throw new Error(
        "You are not the owner of this NFT. Please connect the wallet that owns this token."
      );

    try {
      await _relistNFT({
        tokenId,
        price,
        signer: state.account.signer,
      });
      toast.success("🎉 NFT relisted successfully!");

      const marketplaceItems = await getAllNFTS(state.account.signer);
      updateItems({ type: "SET_ITEMS", items: marketplaceItems });

      const userItems = await _getAllUserNfts(
        state.account.address,
        state.account.signer
      );

      const filteredUserItems = filterRelistNFTs(
        userItems,
        state.account.address,
        marketplaceItems
      );

      updateItems({ type: "SET_USER_ITEMS", items: filteredUserItems });
    } catch (error) {
      console.error("❌ Error while relist NFT:", error);
      messageError("relist NFT");
    }
  };

  const purchaseNFT = async (itemId: number) => {
    if (!state.account)
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );

    try {
      const { buyer } = await _purchaseNFT({
        itemId,
        signer: state.account.signer,
      });

      const updated = state.baseItems.map((item) =>
        item.itemId === itemId ? { ...item, sold: true, owner: buyer } : item
      );

      updateItems({ type: "SET_USER_ITEMS", items: updated });
      updateItems({ items: updated });

      return true;
    } catch (error) {
      console.error("❌ Error while purchasing NFT:", error);
      messageError("purchase NFT");
      return false;
    }
  };

  // === Getters ===
  const getAccount = async (): Promise<void> => {
    onLoading(true);
    try {
      const account = await _getAccount();
      dispatch({
        type: "SET_ACCOUNT",
        payload: account,
      });
    } catch (error: any) {
      console.error("❌ Error while getting account:", error);
      messageError("get account");
      onError(true);
    } finally {
      onLoading(false);
    }
  };

  const getAllUserNfts = async () => {
    onLoading(true);

    try {
      const result = await _getAllUserNfts(
        state.account!.address,
        state.account!.signer
      );
      updateItems({ type: "SET_USER_ITEMS", items: result });
    } catch (error: any) {
      console.error("❌ Error while getting all user nfts:", error);
      messageError("get all user nfts");
      onError(true);
    } finally {
      onLoading(false);
    }
  };

  const getNFT = (tokenId: number): IPxl | null => {
    const found = state.items.find((item) => item.tokenId === tokenId);

    if (!found) return null;

    return found;
  };

  // === Handle filters & sorting ===
  const updateItemsOrder = (order: "low-to-high" | "high-to-low") => {
    dispatch({ type: "SORT_BY_PRICE", payload: order });
  };

  const onFilterByRarity = (rarity: string) => {
    dispatch({ type: "FILTER_BY_RARITY", payload: rarity });
  };

  const onFilterByStatusUserItems = (
    status: "all" | "sold" | "purchase" | "relist"
  ) => {
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

  const updateAddressMP = (address: string) =>
    dispatch({ type: "SET_ADDRESS_MP", payload: address });

  const onLoading = (value: boolean) =>
    dispatch({ type: "SET_LOADING", payload: value });

  const onError = (value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: value });

  const messageError = (functionAction: string) => {
    toast.error(`Failed to ${functionAction}`);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        marketplaceItems: state.marketplaceItems,
        loading: state.status.loading,
        addressMP: state.addressMP,
        userItems: state.userItems,
        error: state.status.error,
        onFilterByStatusUserItems,
        account: state.account,
        updateItemsOrder,
        onFilterByRarity,
        getAllUserNfts,
        purchaseNFT,
        getAccount,
        relistNFT,
        createNFT,
        progress,
        getNFT,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
}
