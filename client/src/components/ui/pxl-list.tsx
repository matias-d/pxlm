import PxlListTable from "./pxl-list-table/pxl-list-table";
import Drawer from "../marketplace/home/purchase/drawer";
import PXLCard from "@/components/ui/pxl-card";
import type { IPxl } from "@/interfaces/pxl";
import useDrawer from "@/hooks/useDrawer";
import PXLImage from "./pxl-image";
import PxlCard from "./pxl-card";
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
  const { isOpen, onBuy, onOpenDrawer, pxls } = useDrawer();

  if (loading)
    return (
      <>
        {renderLoading()}
        <Drawer
          type="single"
          onOpen={onOpenDrawer}
          open={isOpen}
          items={pxls}
        />
      </>
    );

  if (error)
    return (
      <>
        <Error
          action={() => (
            <Button asChild className="h-12 text-sm">
              Try again
            </Button>
          )}
          title="505 | A network error has occurred"
        />
        <Drawer
          type="single"
          onOpen={onOpenDrawer}
          open={isOpen}
          items={pxls}
        />
      </>
    );

  if (!items.length)
    return (
      <>
        {renderNotItems()}
        <Drawer
          type="single"
          onOpen={onOpenDrawer}
          open={isOpen}
          items={pxls}
        />
      </>
    );

  if (layout && layout === "table")
    return (
      <>
        <PxlListTable items={items} />
        <Drawer
          type="single"
          onOpen={onOpenDrawer}
          open={isOpen}
          items={pxls}
        />
      </>
    );

  return (
    <>
      <section
        className={cn("grid grid-cols-1 lg:grid-cols-4 gap-4", className)}
      >
        {items.map((pxl) => (
          <PXLCard.Card key={pxl.tokenId} itemId={pxl.itemId}>
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
      <Drawer type="single" onOpen={onOpenDrawer} open={isOpen} items={pxls} />
    </>
  );
}
