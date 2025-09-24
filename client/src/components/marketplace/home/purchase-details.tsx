import { getRarityTier } from "@/helpers/functions/pxl-get-rarity";
import { useDisableScroll } from "@/hooks/useDisabelScroll";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import { BadgeCheck, X } from "lucide-react";
import Button from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Confetti } from "@/utils/confetti";
import Logo from "@/components/ui/logo";
import Card from "@/components/ui/card";
import { cn } from "@/lib/cn";
import ModalSave from "../../ui/modal-save";

interface Props {
  onOpen: (pxl: IPxl | null) => void;
  open: boolean;
  pxl: IPxl | null;
}

export default function PurchaseDetails({ onOpen, open, pxl }: Props) {
  const { account, purchaseNFT } = useMarketplace();
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
  const options = currentPxl ? getRarityTier(currentPxl.rarity_score) : null;

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
              <div>
                <h2 className="text-2xl font-accent text-accent font-semibold mb-6">
                  Checkout
                </h2>
                <Card className="bg-transparent border-none flex items-center p-0 justify-between">
                  <div className="flex items-center gap-x-3">
                    <img
                      src={currentPxl.image}
                      className="size-12 rounded-md"
                    />
                    <div className="flex flex-col items-start gap-x-2">
                      <h4 className="font-semibold font-display flex items-center gap-x-2">
                        {currentPxl.name}{" "}
                        <BadgeCheck className="text-accent" size={18} />
                      </h4>
                      <div className="flex items-center gap-x-1">
                        <p className="text-xs text-text-primary/80">
                          #{currentPxl.rarity_score}
                        </p>
                        {options && (
                          <p
                            className={cn(
                              "text-xs px-1 rounded-sm border font-display font-semibold capitalize",
                              options.tailwind.bg,
                              options.tailwind.text
                            )}
                          >
                            {options.name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold font-display">
                      {currentPxl.price} TBNB
                    </p>
                    <p className="text-sm text-text-primary/60">$1.2</p>
                  </div>
                </Card>

                <hr className="w-full line-border my-4" />

                <div className="flex items-center justify-between">
                  <p className="font-semibold font-display text-sm">TOTAL</p>
                  <div className="flex flex-col items-end">
                    <p className="font-semibold font-display">
                      {currentPxl.price} TBNB
                    </p>
                    <p className="text-sm text-text-primary/60">$1.2</p>
                  </div>
                </div>
              </div>
              <span className="h-[calc(100%-2rem)] w-[2px] bg-border absolute left-1/2 -translate-x-1/2 top-2"></span>

              <div className="space-y-2">
                <Logo />
                <h2 className="text-lg font-accent text-accent font-semibold">
                  Payment
                </h2>
                <div className="space-y-2 my-4 font-display">
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary">Wallet</p>
                    <p>Metamask</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary">Network</p>
                    <p>BSC Testnet</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary">Blockchain</p>
                    <p>Etherum</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-text-secondary">Address</p>
                    <p>
                      {account?.address ? shortenAddress(account.address) : ""}
                    </p>
                  </div>
                </div>

                <hr className="w-full line-border my-4" />

                <Button
                  classNameContainer="flex items-center gap-x-2 font-semibold"
                  onClick={() => onPurchase(currentPxl.tokenId)}
                  className="w-full"
                  disabled={status.load}
                  loading={status.load}
                >
                  <img
                    src="/metamask.svg"
                    alt="Logo metamask"
                    className="size-14"
                  />
                  Purchase
                </Button>
              </div>
            </section>
          )}
        </section>
      </div>
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
