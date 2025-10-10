import NotItems from "@/components/ui/not-items";
import Loading from "@/components/ui/loading";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import SelectedCard from "./selected-card";

import { Link } from "react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import useMarketplace from "@/hooks/useMarketplace";
import ModalSave from "@/components/ui/modal-save";

interface Props {
  items: IPxl[];
  loading: boolean;
}

export default function RelistItem({ items, loading }: Props) {
  const { relistNFT } = useMarketplace();

  const [selected, setSelected] = useState<IPxl | null>(items[0] || null);

  const onSelect = (pxl: IPxl | null) => setSelected(pxl);

  const [relistedItem, setRelistedItem] = useState<IPxl | null>(null);
  const [price, setPrice] = useState(selected?.price || "");
  const [status, setStatus] = useState({
    load: false,
    error: false,
    success: false,
  });

  useEffect(() => {
    setPrice(selected?.price || "");
  }, [selected]);

  const onRelist = async () => {
    setStatus((prev) => ({ ...prev, load: true }));
    try {
      const isSuccess = await relistNFT(selected!.tokenId, price);
      if (isSuccess) {
        setRelistedItem(selected);
        setStatus((prev) => ({ ...prev, success: true }));
        onClear();
      }
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, load: false }));
    }
  };

  const onPrice = (newPrice: string) => setPrice(newPrice);

  const onClear = () => {
    const nextNFT = items.find((pxl) => pxl.tokenId !== selected?.tokenId);
    onSelect(nextNFT ? nextNFT : null);
    setPrice(nextNFT?.price || "");
  };
  const onClose = () => {
    setStatus({ load: false, error: false, success: false });
    setRelistedItem(null);
  };

  if (loading)
    return <Loading label="Obtaining purchased collection" withIcon />;

  if (!selected) {
    return (
      <>
        <section className="flex justify-center items-center ">
          <NotItems message="You don't have any pxl to relist yet. Explore the marketplace and get your first one.">
            <Button className="h-4 text-xs px-4" asChild>
              <Link to="/marketplace">Marketplace</Link>
            </Button>
          </NotItems>
        </section>
        <ModalSave
          title="🎉 PXL Listing!"
          items={relistedItem ? [relistedItem] : []}
          open={status.success}
          onOpen={onClose}
          renderButtonClose={(onClose) => (
            <Button className="h-12 text-base btn-display" onClick={onClose}>
              Close
            </Button>
          )}
        />
      </>
    );
  }

  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <header className="flex items-center justify-center flex-wrap gap-4 mb-12 bg-card  p-4 rounded-md border border-border">
          {items.map((pxl) => (
            <button
              key={pxl.itemId}
              onClick={() => onSelect(pxl)}
              className={cn(
                "rounded-lg overflow-hidden cursor-pointer",
                selected === pxl
                  ? "ring-2 ring-accent ring-offset-4 ring-offset-card "
                  : "grayscale-50 hover:ring-2 hover:ring-accent hover:ring-offset-4 hover:ring-offset-card transition-all hover:grayscale-0 "
              )}
            >
              <img
                key={pxl.tokenId}
                alt={`PXL Media #${pxl.tokenId}`}
                src={pxl.image}
                className="size-20"
              />
            </button>
          ))}
        </header>

        <section>
          <SelectedCard
            selected={selected}
            load={status.load}
            onPrice={onPrice}
            onRelist={onRelist}
            price={price}
          />
        </section>
      </section>
      <ModalSave
        title="🎉 PXL Listing!"
        items={relistedItem ? [relistedItem] : []}
        open={status.success}
        onOpen={onClose}
        renderButtonClose={(onClose) => (
          <Button className="h-12 text-base btn-display" onClick={onClose}>
            Close
          </Button>
        )}
      />
    </>
  );
}
