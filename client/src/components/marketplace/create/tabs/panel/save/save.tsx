import type { IPxl, IPxlCreate } from "@/interfaces/pxl";
import SpecialCombo from "@/components/ui/special-combo";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import ErrorComponent from "@/components/ui/error";
import { Tooltip } from "@/components/ui/tooltip";
import ContainerPanel from "../container-panel";
import Button from "@/components/ui/button";
import Rarity from "@/components/ui/rarity";
import { ChevronLeft } from "lucide-react";
import TraitCard from "../../../trait-card";
import Card from "@/components/ui/card";
import confetti from "canvas-confetti";
import ModalSave from "./modal-save";
import { useState } from "react";

interface Props {
  onPrevStep: () => void;
  onReset: () => void;
  pxl: IPxlCreate;
}

export default function Save({ onPrevStep, pxl, onReset }: Props) {
  const { account, createNFT, progress, getNFT } = useMarketplace();

  const [open, setOpen] = useState(false);
  const [nft, setNFT] = useState<IPxl | null>(null);

  const [status, setStatus] = useState({
    load: false,
    error: false,
  });

  const onSave = async () => {
    setStatus((prev) => ({ ...prev, load: true }));
    try {
      const result = await createNFT(pxl);
      if (!result?.tokenId) throw new Error("Token ID is missing");

      const nft = await getNFT(result?.tokenId);
      setNFT(nft);

      confetti({
        particleCount: Math.floor(200 * 0.25),
        spread: 26,
        origin: { y: 0.7 },
        startVelocity: 55,
      });
      onOpen();
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
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

  return (
    <>
      <ContainerPanel pxl={pxl}>
        <section className="flex flex-col justify-between h-full ">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-display  font-semibold text-sm">
                TRAITS{" "}
                <span className="text-text-secondary">
                  {pxl.attributes.length}
                </span>
              </h4>
              <div className="flex items-center gap-x-2">
                <SpecialCombo bonuses={pxl.bonuses} />

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
              <Card className="bg-card-dark  relative ">
                <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                  NAME
                </p>

                <p className="text-sm">PXL ART #0000</p>
              </Card>
              <Card className="bg-card-dark  relative ">
                <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                  PRICE
                </p>

                <p className="text-sm">{pxl.price} TBNB</p>
              </Card>

              <Card className="bg-card-dark  relative ">
                <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                  OWNER
                </p>

                <p className="text-sm">{owner}</p>
              </Card>
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

      <ModalSave onReset={onReset} nft={nft} open={open} onOpen={onOpen} />
    </>
  );
}
