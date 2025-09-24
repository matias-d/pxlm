import Drawer from "../marketplace/home/purchase/drawer";
import PXLCard from "@/components/widgets/pxl-card";
import type { IPxl } from "@/interfaces/pxl";
import PXLImage from "../ui/pxl-image";
import Button from "../ui/button";
import PxlCard from "./pxl-card";
import { useState } from "react";
import Error from "../ui/error";
import { cn } from "@/lib/cn";

interface Props {
  renderLoading: () => React.ReactNode;
  renderNotItems: () => React.ReactNode;
  className?: string;
  loading: boolean;
  items: IPxl[];
  error: boolean;
}

export default function PxlList({
  items,
  error,
  loading,
  className,
  renderLoading,
  renderNotItems,
}: Props) {
  const [drawer, setDrawer] = useState<{ open: boolean; items: IPxl[] }>({
    open: false,
    items: [],
  });

  const onOpen = () => setDrawer((prev) => ({ ...prev, open: !drawer.open }));

  const onBuy = (pxl: IPxl) => {
    setDrawer((prev) => ({ ...prev, items: [pxl] }));
    onOpen();
  };

  if (loading) return renderLoading();

  if (error)
    return (
      <Error
        action={() => (
          <Button asChild className="h-12 text-sm ">
            Try again
          </Button>
        )}
        title="505 | A network error has occurred"
      />
    );

  if (!items.length) return renderNotItems();
  return (
    <>
      <section className={cn("grid grid-cols-4 gap-4", className)}>
        {items.map((pxl) => (
          <PXLCard.Card key={pxl.tokenId} tokenId={pxl.tokenId}>
            <PXLImage pxl={pxl} alt={`PXL Media #${pxl.tokenId}`} />
            <PXLCard.Info
              rarity_score={pxl.rarity_score}
              tokenId={pxl.tokenId}
            />
            <PxlCard.PriceDetails price={pxl.price} isSold={pxl.sold} />
            <PxlCard.FooterContent>
              <PxlCard.ButtonCard onClick={() => onBuy(pxl)} pxl={pxl} />
            </PxlCard.FooterContent>
          </PXLCard.Card>
        ))}
      </section>
      <Drawer onOpen={onOpen} open={drawer.open} items={drawer.items} />
    </>
  );
}
