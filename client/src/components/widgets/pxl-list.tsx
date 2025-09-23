import PXLCard from "@/components/widgets/pxl-card";
import type { IPxl } from "@/interfaces/pxl";
import PXLImage from "../ui/pxl-image";
import Button from "../ui/button";
import PxlCard from "./pxl-card";
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
    <section className={cn("grid grid-cols-4 gap-4", className)}>
      {items.map((pxl) => (
        <PXLCard.Card key={pxl.tokenId}>
          <PXLImage src={pxl.image} alt={`PXL Media #${pxl.tokenId}`} />
          <PXLCard.Info rarity_score={pxl.rarity_score} tokenId={pxl.tokenId} />
          <PxlCard.PriceDetails price={pxl.price} />
          <PxlCard.FooterContent>
            <PxlCard.Button price={pxl.price} />
          </PxlCard.FooterContent>
        </PXLCard.Card>
      ))}
    </section>
  );
}
