import { shortenAddress } from "@/utils/shorten-address";
import type { IState } from "@/hooks/create/useCreate";
import useMarketplace from "@/hooks/useMarketplace";
import PxlCard from "@/components/widgets/pxl-card";
import { Tooltip } from "@/components/ui/tooltip";
import ContainerPanel from "./container-panel";
import Button from "@/components/ui/button";
import Rarity from "@/components/ui/rarity";
import { ChevronLeft } from "lucide-react";
import Error from "@/components/ui/error";
import TraitCard from "../../trait-card";
import Modal from "@/components/ui/modal";
import Card from "@/components/ui/card";
import confetti from "canvas-confetti";
import { Link } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  onPrevStep: () => void;
  pxl: IState;
}

export default function Save({ onPrevStep, pxl }: Props) {
  const { account } = useMarketplace();

  const error = false;
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    if (!open)
      confetti({
        particleCount: Math.floor(200 * 0.25),
        spread: 26,
        origin: { y: 0.7 },
        startVelocity: 55,
      });

    setOpen(!open);
  };

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
                <p className="text-sm font-display font-semibold">
                  RARITY <span className="text-accent">#{pxl.rarity}</span>
                </p>
                <Rarity rarity={pxl.rarity} />
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
                onClick={onPrevStep}
                className="h-2 btn-display flex items-center justify-center px-2 text-base "
              >
                <ChevronLeft />
              </Button>
            </Tooltip>
            <Button
              onClick={onOpen}
              className="h-12 flex items-center justify-center"
            >
              🎉 Save
            </Button>
          </div>
        </section>
      </ContainerPanel>

      <ModalSave error={error} open={open} onOpen={onOpen} />
    </>
  );
}

// Modal Presentation PXL CARD
const ModalSave = ({
  open,
  onOpen,
  error,
}: {
  open: boolean;
  error: boolean;
  onOpen: () => void;
}) => {
  return (
    <Modal
      isOpen={open}
      onOpen={onOpen}
      classNameCard="bg-card-light flex flex-col justify-between p-6"
    >
      <PxlCard />

      <div className={cn("flex justify-between mt-4", error && "justify-end")}>
        {!error && (
          <Button
            asChild
            className="btn-display text-base h-12 "
            onClick={onOpen}
          >
            <Link to="/marketplace/create">Try again</Link>
          </Button>
        )}

        <Button asChild className="text-base h-12 " onClick={onOpen}>
          <Link to="/marketplace">Home</Link>
        </Button>
      </div>
    </Modal>
  );
};
