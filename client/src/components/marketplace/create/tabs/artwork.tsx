import { Tooltip } from "../../../ui/tooltip";
import PXLImage from "../../../ui/pxl-image";
import { RotateCcw } from "lucide-react";
import Button from "../../../ui/button";
import Card from "../../../ui/card";
import CardDark from "../card-dark";

interface Props {
  onNextStep: () => void;
}

export default function Artwork({ onNextStep }: Props) {
  return (
    <section>
      <Card className="flex items-start gap-x-4 w-full p-6">
        <PXLImage src="/pxl-examples/6.svg" alt="PXL ART" />

        <div className=" p-2 flex flex-col justify-between h-[25rem] ">
          <div className="flex items-center justify-between ">
            <h2 className=" font-accent tracking-wide text-2xl font-bold">
              PXL ART <span className="text-text-secondary text-xl">#0000</span>
            </h2>
            <div className="flex items-center gap-x-1">
              <p className="text-xs text-text-secondary">by DiceBear</p>
              <img src="/dicebear-logo.ico" className="size-4 rounded-full" />
            </div>
          </div>

          <div>
            <div>
              <h4 className="font-display mb-2 font-semibold text-sm">
                TRAITS <span className="text-text-secondary">4</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <CardDark title="hat" value="Beani" />
                <CardDark title="accesory" value="Drilling small" />
                <CardDark title="glasses" value="Dark glasses" />
                <CardDark title="beard" value="Low beard" />
              </div>
            </div>
            <Card className="p-3 bg-card-dark">
              <div>
                <h3 className="text-sm text-text-secondary">PRICE</h3>
                <p className="font-display font-semibold text-xl">0.4 TBNB</p>
              </div>
            </Card>
          </div>

          <div className="flex justify-between w-full items-center gap-x-4">
            <div className="flex items-center  gap-x-2">
              <span className="text-[10px] bg-yellow-300/10 text-yellow-500 px-2 py-1 rounded-md">
                2 attempts
              </span>
              <Tooltip content="Generate again">
                <Button className="btn-display h-1 w-1 rounded-full">
                  <RotateCcw size={18} />
                </Button>
              </Tooltip>
            </div>
            <Button onClick={onNextStep} className="text-base h-12">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
