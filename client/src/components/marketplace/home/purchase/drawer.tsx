import { useDisableScroll } from "@/hooks/useDisabelScroll";
import useMarketplace from "@/hooks/useMarketplace";
import ModalSave from "@/components/ui/modal-save";
import type { IPxl } from "@/interfaces/pxl";
import { useState, useEffect } from "react";
import { Confetti } from "@/utils/confetti";
import Button from "@/components/ui/button";
import useCart from "@/hooks/useCart";
import Checkout from "./checkout";
import { X } from "lucide-react";
import Payment from "./payment";
import { cn } from "@/lib/cn";
import { toast } from "sonner";

interface Props {
  type?: "cart" | "single";
  afterPurchase?: () => void;
  onOpen: () => void;
  open: boolean;
  items: IPxl[];
}

export default function Drawer({
  onOpen,
  open,
  items,
  type = "cart",
  afterPurchase,
}: Props) {
  useDisableScroll(open);

  const { purchaseNFT } = useMarketplace();
  const { removeCart, inCart, baseCart, clearCart } = useCart();

  const [currentItems, setCurrentItems] = useState<IPxl[]>(items);
  const [status, setStatus] = useState({
    load: false,
    error: false,
    success: false,
  });

  useEffect(() => {
    if (items) {
      setCurrentItems(items);
    }
    if (!open && !items) {
      const timer = setTimeout(() => {
        setCurrentItems([]);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [items, open]);

  const onPurchase = async () => {
    if (!currentItems || currentItems.length === 0) return;

    setStatus({ load: true, error: false, success: false });

    const toastId = toast.loading("Starting purchase...");

    try {
      for (let i = 0; i < currentItems.length; i++) {
        const item = currentItems[i];

        toast.loading(
          currentItems.length > 1
            ? `Purchasing NFT ${i + 1} of ${currentItems.length}...`
            : `Purchasing NFT ...`,
          { id: toastId }
        );

        const success = await purchaseNFT(item.itemId);

        if (!success) {
          toast.error(`Failed to purchase NFT #${item.tokenId}`, {
            id: toastId,
            duration: 1200,
          });
          throw new Error(`Failed to purchase NFT #${item.tokenId}`);
        }
      }

      toast.success("All NFTs purchased successfully! 🎉", { id: toastId });
      Confetti();
      setStatus((prev) => ({ ...prev, success: true }));
      onEnd();
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, load: false }));
      if (afterPurchase) afterPurchase();
    }
  };

  const onClearCart = () => {
    const itemsFound = items.filter((pxl) => inCart(pxl.tokenId));
    itemsFound.forEach((pxl) => removeCart(pxl.tokenId));
  };

  const onEnd = () => {
    onOpen();
    onClearCart();
  };

  const onCloseModal = () => {
    setStatus({ load: false, error: false, success: false });
    clearCart();
  };

  return (
    <>
      <div
        className={cn(
          "w-full bg-card h-[calc(100vh-5rem)] md:h-[550px] lg:h-[500px] fixed left-0 z-50 rounded-tr-lg rounded-tl-lg lg:rounded-tr-xl lg:rounded-tl-xl border-t border-border transition-all duration-400 ease-in-out",
          !open ? "-bottom-full" : "bottom-0"
        )}
      >
        <button
          className="absolute right-12 top-3 transition-colors hover:bg-card-super-light p-1 rounded-full cursor-pointer"
          onClick={onOpen}
        >
          <X />
        </button>
        <section className="max-container pt-4 lg:pt-6 h-full relative">
          {currentItems?.length > 0 && (
            <section className="grid grid-cols-1 lg:grid-cols-2 w-full lg:gap-20  relative lg:h-full">
              <Checkout items={currentItems} />
              <span className="lg:block hidden h-[calc(100%-2rem)] w-[2px] bg-border absolute left-1/2 -translate-x-1/2 top-2"></span>

              <Payment load={status.load} onPurchase={onPurchase} />
            </section>
          )}
        </section>
      </div>

      {/* Layout black */}
      <div
        role="button"
        onClick={onOpen}
        className={cn(
          "inset-0 bg-black/30 w-full h-full fixed transition-all",
          open
            ? "bg-black/30 z-40 opacity-100"
            : "-z-20 opacity-0 pointer-events-none"
        )}
      />

      <ModalSave
        disableOutsideClick
        title="🎉 Your new PXL!"
        onOpen={onCloseModal}
        open={status.success}
        items={type === "cart" ? baseCart : currentItems}
        renderButtonClose={(onClose) => (
          <Button className="h-12 text-base btn-display" onClick={onClose}>
            Close
          </Button>
        )}
        renderHandleNext={(onNext, isLastItem) =>
          !isLastItem && (
            <Button className="h-12 text-base" onClick={onNext}>
              Next
            </Button>
          )
        }
      />
    </>
  );
}
