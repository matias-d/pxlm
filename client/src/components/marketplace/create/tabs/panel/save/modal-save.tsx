import PXLCard from "@/components/widgets/pxl-card";
import PXLImage from "@/components/ui/pxl-image";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { Link } from "react-router";

interface Props {
  onReset: () => void;
  onOpen: () => void;
  nft: IPxl | null;
  open: boolean;
}

export default function ModalSave({ open, onOpen, nft, onReset }: Props) {
  if (!nft) return null;

  const reset = () => {
    onOpen();
    onReset();
  };

  return (
    <Modal
      isOpen={open}
      onOpen={onOpen}
      disableOutsideClick
      classNameCard="bg-card-light flex flex-col justify-between p-6"
    >
      <PXLCard.Card key={nft.tokenId}>
        <PXLImage
          classNameContainer="size-[18.75rem] bg-card-super-light "
          alt={`PXL Media #${nft.tokenId}`}
          src={nft.image}
        />
        <PXLCard.Info rarity_score={nft.rarity_score} tokenId={nft.tokenId} />
        <PXLCard.PriceDetails price={nft.price} />
        <PXLCard.FooterContent>
          <PXLCard.Button price={nft.price} />
        </PXLCard.FooterContent>
      </PXLCard.Card>

      <div className={"flex justify-between mt-4"}>
        <Button className="btn-display text-base h-12" onClick={reset} asChild>
          <Link to="/marketplace/create">Try again</Link>
        </Button>

        <Button asChild className="text-base h-12 " onClick={onOpen}>
          <Link to="/marketplace">Home</Link>
        </Button>
      </div>
    </Modal>
  );
}
