import type { IPxl, IPxlCreate } from "@/interfaces/pxl";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import DetailCard from "@/components/ui/detail-card";
import ErrorComponent from "@/components/ui/error";
import ModalSave from "@/components/ui/modal-save";
import { Tooltip } from "@/components/ui/tooltip";
import ContainerPanel from "./container-panel";
import { Confetti } from "@/utils/confetti";
import Button from "@/components/ui/button";
import Rarity from "@/components/ui/rarity";
import { ChevronLeft } from "lucide-react";
import TraitCard from "../../trait-card";
import { Link } from "react-router";
import { useState } from "react";

interface Props {
  onPrevStep: () => void;
  onReset: () => void;
  pxl: IPxlCreate;
}

export default function Save({ onPrevStep, pxl, onReset }: Props) {
  const { account, createNFT, progress } = useMarketplace();

  const [open, setOpen] = useState(false);
  const [nft, setNFT] = useState<IPxl | null>(null);

  const [status, setStatus] = useState({
    load: false,
    error: false,
  });

  const onSave = async () => {
    setStatus((prev) => ({ ...prev, load: true }));
    try {
      const resultNFT = await createNFT(pxl);
      setNFT(resultNFT);
      onOpen();
      Confetti();
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
      setOpen(false);
      onReset();
    } finally {
      setStatus((prev) => ({ ...prev, load: false }));
    }
  };

  const onOpen = () => setOpen(!open);

  if (status.error)
    return (
      <ErrorComponent
        action={() => (
          <Button asChild className="h-12 text-sm">
            Try again
          </Button>
        )}
        title="505 | A network error has occurred"
      />
    );

  const owner =
    (account?.address && shortenAddress(account?.address)) || "Uknowed user";

  const items = nft ? [nft] : [];
  return (
    <>
      <ContainerPanel pxl={pxl}>
        <section className="flex flex-col justify-between h-full ">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display  font-semibold text-sm">
                TRAITS{" "}
                <span className="text-text-secondary">
                  {pxl.attributes.length}
                </span>
              </h4>
              <div className="flex items-center gap-x-2">
                <p className="text-sm font-display font-semibold">
                  RARITY{" "}
                  <span className="text-accent">#{pxl.rarity_score}</span>
                </p>
                <Rarity rarity={pxl.rarity_score} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {pxl.attributes.map((trait) => (
                <TraitCard trait={trait} key={trait.trait_type} />
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display mb-2 font-semibold text-sm">DETAILS</h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <DetailCard title="name" value="PXL ART #0000" />
              <DetailCard title="price" value={`${pxl.price} TBNB`} />
              <DetailCard title="owner" value={owner} />
            </div>
          </div>
          <div className="w-full flex  items-center justify-between">
            <Tooltip content="Back" contentClassName="bg-card-super-light">
              <Button
                className="h-2 btn-display px-2 text-base"
                onClick={onPrevStep}
                disabled={status.load}
              >
                <ChevronLeft />
              </Button>
            </Tooltip>
            <Button
              className="h-12 disabled:bg-accent/95"
              progress={progress}
              onClick={onSave}
              disabled={status.load}
              loading={status.load}
            >
              🎉 Save
            </Button>
          </div>
        </section>
      </ContainerPanel>

      <ModalSave
        items={items}
        open={open}
        onOpen={onOpen}
        disableOutsideClick
        className="justify-between"
      >
        <Button
          className="btn-display text-base h-12"
          onClick={onReset}
          asChild
        >
          <Link to="/marketplace/create">Try again</Link>
        </Button>

        <Button asChild className="text-base h-12 " onClick={onOpen}>
          <Link to="/marketplace">Home</Link>
        </Button>
      </ModalSave>
    </>
  );
}
