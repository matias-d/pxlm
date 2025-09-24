import { useDisableScroll } from "@/hooks/useDisabelScroll";
import useMarketplace from "@/hooks/useMarketplace";
import ModalSave from "../../../ui/modal-save";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Confetti } from "@/utils/confetti";
import Checkout from "./checkout";
import { X } from "lucide-react";
import Payment from "./payment";
import { cn } from "@/lib/cn";

interface Props {
  onOpen: (pxl: IPxl | null) => void;
  open: boolean;
  pxl: IPxl | null;
}

export default function Drawer({ onOpen, open, pxl }: Props) {
  const { purchaseNFT } = useMarketplace();
  const [currentPxl, setCurrentPxl] = useState<IPxl | null>(pxl);

  const [status, setStatus] = useState({
    load: false,
    error: false,
    success: false,
  });

  useDisableScroll(open);

  useEffect(() => {
    if (pxl) {
      setCurrentPxl(pxl);
    }
    if (!open && !pxl) {
      const timer = setTimeout(() => {
        setCurrentPxl(null);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [pxl, open]);

  const onPurchase = async (tokenId: number) => {
    setStatus((prev) => ({ ...prev, load: true }));
    try {
      await purchaseNFT(tokenId);
      Confetti();
      setStatus((prev) => ({ ...prev, success: true }));
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, load: false }));
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full bg-card h-[500px] fixed left-0 z-30 rounded-tr-xl rounded-tl-xl border-t border-border transition-all duration-400 ease-in-out",
          !open ? "-bottom-full" : "bottom-0"
        )}
      >
        <button
          className="absolute right-12 top-3 transition-colors hover:bg-card-super-light p-1 rounded-full cursor-pointer"
          onClick={() => onOpen(null)}
        >
          <X />
        </button>
        <section className="max-container pt-6 h-full relative">
          {currentPxl && (
            <section className="grid grid-cols-2 w-full gap-x-20 relative h-full">
              <Checkout pxl={currentPxl} />
              <span className="h-[calc(100%-2rem)] w-[2px] bg-border absolute left-1/2 -translate-x-1/2 top-2"></span>

              <Payment
                load={status.load}
                onPurchase={() => onPurchase(currentPxl.tokenId)}
              />
            </section>
          )}
        </section>
      </div>

      {/* Layout black */}
      <div
        role="button"
        onClick={() => onOpen(null)}
        className={cn(
          "inset-0 bg-black/30 w-full h-full fixed transition-all",
          open ? "bg-black/30 z-20 opacity-100" : "-z-10 opacity-0"
        )}
      />

      <ModalSave
        title="🎉 Your new PXL!"
        onOpen={() => onOpen(null)}
        nft={pxl}
        open={status.success}
        className="justify-end"
      >
        <Button
          className="btn-display text-base h-12"
          onClick={() => onOpen(null)}
        >
          Close
        </Button>
      </ModalSave>
    </>
  );
}
