/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAttributes } from "@/interfaces/attributes";
import { generatePXL } from "@/services/dice-bear";
import useMarketplace from "../useMarketplace";
import { useState } from "react";
import { toast } from "sonner";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
export interface IState {
  url: string;
  attributes: IAttributes[];
  timestamp: number;
  rarity: number;
  price: number;
}

export default function useCreate() {
  const { account } = useMarketplace();

  const [load, setLoad] = useState(false);
  const [pxl, setPXL] = useState<IState>({
    url: "",
    attributes: [],
    timestamp: 0,
    rarity: 0,
    price: 0,
  });

  // Tabs
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goToPrevStep = () => {
    setSelectedIndex((prevIndex) => {
      return prevIndex !== 0 ? prevIndex - 1 : prevIndex;
    });
  };

  const goToNextStep = () => {
    setSelectedIndex((prevIndex) => {
      return prevIndex < 3 ? prevIndex + 1 : prevIndex;
    });
  };

  const onGeneratePXL = async (isTry = false) => {
    if (!account) throw new Error("GenerattePXL not account login");

    try {
      setLoad(true);

      const result = generatePXL({ address: account?.address });
      setPXL(result);

      if (!isTry) goToNextStep();

      await sleep(2000);
    } catch (error: any) {
      console.error("Generate PXL ERROR: ", error);
      toast.error(
        "An error occurred while generate the PXL ART: ",
        error.message
      );
    } finally {
      setLoad(false);
    }
  };

  return {
    onGeneratePXL,
    pxl,
    load,

    setSelectedIndex,
    selectedIndex,
    goToPrevStep,
    goToNextStep,
  };
}
