/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IAttributes } from "@/interfaces/attributes";
import { generatePXL } from "@/services/dice-bear";
import useMarketplace from "../useMarketplace";
import { useState } from "react";
import { toast } from "sonner";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
interface IAttempts {
  count: number;
  firstTry: number;
}

const MAX_TRIES = 3;
const COOLDOWN = 2 * 60 * 1000;
const STORAGE_KEY = "pxl_attempts";

export const getAttempts = (): IAttempts => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { count: 0, firstTry: 0 };
};

const saveAttempts = (attempts: IAttempts) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
};

const resetAttempts = () => {
  saveAttempts({ count: 0, firstTry: 0 });
};

export interface IState {
  url: string;
  attributes: IAttributes[];
  timestamp: number;
  rarity: number;
  price: number;
  bonuses: string[];
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
    bonuses: [],
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

  const onPrice = (newPrice: number) =>
    setPXL((prev) => ({ ...prev, price: newPrice }));

  const onGeneratePXL = async (isTry = false) => {
    if (!account) throw new Error("GeneratePXL: no account login");

    const canProceed = canTry();
    if (!canProceed) return;

    try {
      setLoad(true);

      const result = generatePXL({ address: account.address });
      setPXL(result);

      if (!isTry) goToNextStep();
      await sleep(2000);
    } catch (error: any) {
      console.error("Generate PXL ERROR:", error);
      toast.error("Error al generar el PXL ART", {
        description: error.message,
      });
    } finally {
      setLoad(false);
    }
  };

  const canTry = () => {
    const attempts = getAttempts();
    const now = Date.now();

    if (attempts.firstTry && now - attempts.firstTry > COOLDOWN) {
      resetAttempts();
    }

    const updated = getAttempts();

    if (updated.count >= MAX_TRIES && updated.firstTry) {
      const waitMs = COOLDOWN - (now - updated.firstTry);
      if (waitMs > 0) {
        const minutes = Math.ceil(waitMs / 60000);
        toast.info(
          `You've already had your three attempts. Please wait ${minutes} min.`
        );
        return false;
      } else {
        resetAttempts();
      }
    }

    // Guardar nuevo intento
    const newAttempts: IAttempts = {
      count: updated.count + 1,
      firstTry: updated.firstTry || now,
    };
    saveAttempts(newAttempts);

    return true;
  };

  return {
    onGeneratePXL,
    pxl,
    load,
    onPrice,

    setSelectedIndex,
    selectedIndex,
    goToPrevStep,
    goToNextStep,
  };
}
