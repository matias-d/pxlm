import { RotateCcw } from "lucide-react";
import Button from "../../../ui/button";
import Card from "../../../ui/card";
import { Tooltip } from "../../../ui/tooltip";

interface Props {
  onNextStep: () => void;
}

export default function Artwork({ onNextStep }: Props) {
  return (
    <section className="  w-3xl ">
      <Card className="flex items-start gap-x-4 w-full">
        <img
          src="/pxl-examples/6.svg"
          className="w-80 h-[25rem] object-cover rounded-md shadow "
        />
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
                <Card className="bg-card-dark w-44">
                  <p className="text-xs text-text-secondary font-display font-semibold">
                    HAT
                  </p>
                  <p className="text-sm">Beani</p>
                </Card>
                <Card className="bg-card-dark w-44">
                  <p className="text-xs text-text-secondary font-display font-semibold">
                    ACCESORY
                  </p>
                  <p className="text-sm">Pearcing small</p>
                </Card>
                <Card className="bg-card-dark w-44">
                  <p className="text-xs text-text-secondary font-display font-semibold">
                    GLASSES
                  </p>
                  <p className="text-sm">Dark glasses</p>
                </Card>
                <Card className="bg-card-dark w-44">
                  <p className="text-xs text-text-secondary font-display font-semibold">
                    BEARD
                  </p>
                  <p className="text-sm">Low beard</p>
                </Card>
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
                <Button className="h-1 w-1 rounded-full flex items-center justify-center">
                  <RotateCcw size={18} />
                </Button>
              </Tooltip>
            </div>
            <Button
              onClick={onNextStep}
              className="text-base h-12 flex items-center justify-center"
            >
              Customize data
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
