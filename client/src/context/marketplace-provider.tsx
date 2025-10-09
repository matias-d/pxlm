/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  initialState,
  marketplaceReducer,
} from "./reducer/marketplace/marketplace-reducer";

import {
  _purchaseNFT,
  _createNFT,
  _getAccount,
  _relistNFT,
  getMarketplaceAddress,
  loadAllNFTs,
} from "../services/contracts";
import { createNFTToastController } from "@/utils/create-nft-toast-controller";
import { processAndFormatNFTs } from "@/helpers/functions/process-and-format-nft";
import { MarketplaceContext } from "./marketplace-context";
import type { IPxl, IPxlCreate } from "@/interfaces/pxl";
import { useEffect, useReducer, useState } from "react";
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
        await updateMarketplace();
      } catch (error: any) {
        console.error("❌ Error while getting all nfts:", error);
        messageError("get all nfts");
        onError(true);
      } finally {
        onLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (result) await updateMarketplace();

      return result;
    } catch (error) {
      console.error("❌ Error while creating NFT:", error);
      messageError("create NFT");
      return null;
    } finally {
      setProgress(0);
    }
  };

  const relistNFT = async (
    tokenId: number,
    price: string
  ): Promise<boolean> => {
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

      await updateMarketplace();

      return true;
    } catch (error) {
      console.error("❌ Error while relist NFT:", error);
      messageError("relist NFT");
      return false;
    }
  };

  const purchaseNFT = async (itemId: number) => {
    if (!state.account)
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );

    try {
      await _purchaseNFT({
        itemId,
        signer: state.account.signer,
      });
      await updateMarketplace();
      return true;
    } catch (error) {
      console.error("❌ Error while purchasing NFT:", error);
      messageError("purchase NFT");
      return false;
    }
  };

  // === Getters ===

  const updateMarketplace = async () => {
    if (!state.account)
      throw new Error(
        "Wallet not connected. Please connect your wallet to continue."
      );

    const { allNFTs, marketplaceNFTs, userNFTs } = await loadAllNFTs(
      state.account.signer,
      state.account.address
    );

    console.log("MARKETPLACE ITEMS CONTEXT", marketplaceNFTs);

    updateItems({ type: "SET_ITEMS", items: allNFTs });
    updateItems({ type: "SET_USER_ITEMS", items: userNFTs });
    updateItems({ type: "SET_ITEMS_MARKETPLACE", items: marketplaceNFTs });

    // User items filter
    const searchParams = new URLSearchParams(window.location.search);
    const filter = searchParams.get("filter") || "all";

    onFilterByStatusUserItems(
      filter as "all" | "sold" | "purchased" | "relist"
    );
  };

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

  const getNFT = (itemId: number): IPxl | null => {
    const raw = state.items.find((item) => item.itemId === itemId);
    if (!raw) return null;

    const formatted = processAndFormatNFTs(state.items);
    const found = formatted.find((item) => item.tokenId === raw.tokenId);
    return found ?? null;
  };

  // === Handle filters & sorting ===
  const updateItemsOrder = (order: "low-to-high" | "high-to-low") => {
    dispatch({ type: "SORT_BY_PRICE", payload: order });
  };

  const onFilterByRarity = (rarity: string) => {
    dispatch({ type: "FILTER_BY_RARITY", payload: rarity });
  };

  const onFilterByStatusUserItems = (
    status: "all" | "sold" | "purchased" | "relist"
  ) => {
    dispatch({ type: "FILTER_BY_STATUS_USER_ITEMS", payload: status });
  };

  // === Util reducer functions ===

  const updateItems = ({
    type = "SET_ITEMS",
    items,
  }: {
    type?: "SET_ITEMS" | "SET_ITEMS_MARKETPLACE" | "SET_USER_ITEMS";
    items: IPxl[];
  }) => dispatch({ type: type, payload: items });

  const updateAddressMP = (address: string) =>
    dispatch({ type: "SET_ADDRESS_MP", payload: address });

  const onLoading = (value: boolean) =>
    dispatch({ type: "SET_LOADING", payload: value });

  const onError = (value: boolean) =>
    dispatch({ type: "SET_ERROR", payload: value });

  const messageError = (functionAction: string) => {
    toast.error(`Failed to ${functionAction}, please try again later.`);
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
        items: state.items,
        updateItemsOrder,
        onFilterByRarity,
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
