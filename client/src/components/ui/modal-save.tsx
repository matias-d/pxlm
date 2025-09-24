import PXLCard from "@/components/widgets/pxl-card";
import PXLImage from "@/components/ui/pxl-image";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Link } from "react-router";
import { cn } from "@/lib/cn";

interface Props {
  disableOutsideClick?: boolean;
  children: React.ReactNode;
  className?: string;
  onOpen: () => void;
  nft: IPxl | null;
  open: boolean;
  title?: string;
}

export default function ModalSave({
  disableOutsideClick = false,
  className,
  children,
  onOpen,
  title,
  open,
  nft,
}: Props) {
  if (!nft) return null;

  return (
    <Modal
      isOpen={open}
      onOpen={onOpen}
      disableOutsideClick={disableOutsideClick}
      classNameCard="bg-card-light flex flex-col justify-between p-6"
    >
      {title && (
        <h2 className="text-lg font-bold font-accent mb-4 text-text-primary/80 ">
          {title}
        </h2>
      )}

      <PXLCard.Card key={nft.tokenId}>
        <PXLImage
          classNameContainer="size-[18.75rem] bg-card-super-light "
          alt={`PXL Media #${nft.tokenId}`}
          src={nft.image}
        />
        <PXLCard.Info rarity_score={nft.rarity_score} tokenId={nft.tokenId} />
        <PXLCard.PriceDetails price={nft.price} isSold={nft.sold} />
        <PXLCard.FooterContent>
          <Button
            asChild
            className="w-full h-14 text-base flex items-center rounded-none"
          >
            <Link to="/marketplace">My collection</Link>
          </Button>
        </PXLCard.FooterContent>
      </PXLCard.Card>

      <div className={cn("flex justify-between mt-4", className)}>
        {children}
      </div>
    </Modal>
  );
}
