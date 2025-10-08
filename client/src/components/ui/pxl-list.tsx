import Drawer from "../marketplace/home/purchase/drawer";
import PXLCard from "@/components/ui/pxl-card";
import type { IPxl } from "@/interfaces/pxl";
import PxlListTable from "./pxl-list-table/pxl-list-table";
import PXLImage from "./pxl-image";
import PxlCard from "./pxl-card";
import { useState } from "react";
import Button from "./button";
import { cn } from "@/lib/cn";
import Error from "./error";

interface Props {
  renderLoading: () => React.ReactNode;
  renderNotItems: () => React.ReactNode;
  layout?: "grid" | "table";
  className?: string;
  loading: boolean;
  error: boolean;
  items: IPxl[];
}

export default function PxlList({
  items,
  error,
  layout,
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

  if (layout && layout === "table") return <PxlListTable items={items} />;

  return (
    <>
      <section
        className={cn("grid grid-cols-1 lg:grid-cols-4 gap-4", className)}
      >
        {items.map((pxl) => (
          <PXLCard.Card key={pxl.tokenId} tokenId={pxl.tokenId}>
            <PXLImage pxl={pxl} alt={`PXL Media #${pxl.tokenId}`} />
            <PXLCard.Info
              rarity_score={pxl.rarity_score}
              tokenId={pxl.tokenId}
            />
            <PxlCard.PriceDetails pxl={pxl} />
            <PxlCard.FooterContent>
              <PxlCard.ButtonCard onClick={() => onBuy(pxl)} pxl={pxl} />
            </PxlCard.FooterContent>
          </PXLCard.Card>
        ))}
      </section>
      <Drawer
        type="single"
        onOpen={onOpen}
        open={drawer.open}
        items={drawer.items}
      />
    </>
  );
}
