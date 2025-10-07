import TraitsDisclousure from "@/components/ui/traits-disclousure";
import { ChevronLeft, CircleAlert } from "lucide-react";
import type { IPxlCreate } from "@/interfaces/pxl";
import { Tooltip } from "@/components/ui/tooltip";
import ContainerPanel from "./container-panel";
import Button from "@/components/ui/button";
import Rarity from "@/components/ui/rarity";
import Input from "@/components/ui/input";

interface Props {
  onNextStep: () => void;
  onPrevStep: () => void;
  onPrice: (newPrice: number) => void;
  pxl: IPxlCreate;
}

export default function Customize({
  onNextStep,
  onPrevStep,
  pxl,
  onPrice,
}: Props) {
  return (
    <ContainerPanel pxl={pxl}>
      <section>
        <h2 className="font-semibold text-lg font-accent flex mb-4 text-accent">
          Customize your PXL ART
        </h2>

        <div className="flex items-center gap-x-2 mb-2">
          <p className="text-sm font-display font-semibold">
            RARITY <span className="text-accent">#{pxl.rarity_score}</span>
          </p>
          <Rarity rarity={pxl.rarity_score} />
        </div>
        {/* TRAITS */}
        <TraitsDisclousure attributes={pxl.attributes} />

        <hr className="my-4 border border-border" />

        <form className="w-full flex flex-col justify-between gap-y-4">
          <div className="space-y-4">
            {/* Input Name */}
            <div>
              <h4 className="font-semibold mb-0.5 text-sm">NAME</h4>
              <div className="relative">
                <Input
                  label="Name of PXL ART"
                  type="text"
                  value={"PXL ART #0000"}
                  disabled
                  className="font-semibold"
                />
                <div className="absolute bottom-2.5 right-4">
                  <Tooltip
                    content="Default name"
                    contentClassName="bg-card-super-light "
                    className="whitespace-nowrap"
                  >
                    <CircleAlert size={20} className="text-text-secondary" />
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Input Price */}
            <div>
              <h4 className="font-semibold mb-0.5 text-sm">Price</h4>
              <div className="relative">
                <Input
                  label="Price in TBNB"
                  type="number"
                  required
                  onChange={(e) => onPrice(Number(e.target.value))}
                  value={pxl.price}
                  placeholder="0.001"
                />

                <div className="absolute bottom-2 right-4">
                  <Tooltip
                    className="text-[10px]"
                    contentClassName="w-48"
                    content="Automatically calculated price — recommended for this item."
                  >
                    {" "}
                    <CircleAlert className="text-text-secondary" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between items-center">
            <Tooltip content="Back" contentClassName="bg-card-super-light">
              <Button
                onClick={onPrevStep}
                className="h-2 btn-display flex items-center justify-center px-2 text-base "
              >
                <ChevronLeft />
              </Button>
            </Tooltip>
            <Button className="h-12 text-base" onClick={onNextStep}>
              Next
            </Button>
          </div>
        </form>
      </section>
    </ContainerPanel>
  );
}
