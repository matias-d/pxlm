import TabArtworkSkeleton from "../../skeletons/tab-artwork-skeleton";
import type { IState } from "@/hooks/create/useCreate";
import { Tooltip } from "@/components/ui/tooltip";
import PXLImage from "@/components/ui/pxl-image";
import Rarity from "@/components/ui/rarity";
import Button from "@/components/ui/button";
import Error from "@/components/ui/error";
import Card from "@/components/ui/card";
import TraitCard from "../../trait-card";
import { RotateCcw } from "lucide-react";

interface Props {
  loading: boolean;
  pxl: IState;
  onNextStep: () => void;
  onGeneratePXL: (isTry: boolean) => void;
}

export default function Artwork({
  loading,
  onNextStep,
  onGeneratePXL,
  pxl,
}: Props) {
  const error = false;

  if (loading) return <TabArtworkSkeleton />;

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

  return (
    <section>
      <Card className="flex items-start gap-x-4 w-full p-6">
        <PXLImage src={pxl.url} alt="PXL ART" />

        <div className=" p-2 flex flex-col justify-between h-[25rem] ">
          <section className="flex items-center justify-between ">
            <h2 className=" font-accent tracking-wide text-2xl font-bold">
              PXL ART <span className="text-text-secondary text-xl">#0000</span>
            </h2>
            <div className="flex items-center gap-x-1">
              <p className="text-xs text-text-secondary">by DiceBear</p>
              <img src="/dicebear-logo.ico" className="size-4 rounded-full" />
            </div>
          </section>

          <section>
            <div>
              <div className="flex items-center justify-between">
                <h4 className="font-display mb-2 font-semibold text-sm">
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
              <div className="grid grid-cols-2 gap-3 mb-3">
                {pxl.attributes.map((trait) => (
                  <TraitCard trait={trait} key={trait.trait_type} />
                ))}
              </div>
            </div>
            <Card className="p-3 bg-card-dark">
              <div>
                <h3 className="text-sm text-text-secondary">PRICE</h3>
                <p className="font-display font-semibold text-xl">
                  {pxl.price} TBNB
                </p>
              </div>
            </Card>
          </section>

          <section className="flex justify-between w-full items-center gap-x-4">
            <div className="flex items-center  gap-x-2">
              <span className="text-[10px] bg-yellow-300/10 text-yellow-500 px-2 py-1 rounded-md">
                2 attempts
              </span>
              <Tooltip
                content="Generate again"
                contentClassName="bg-card-super-light text-xs"
              >
                <Button
                  onClick={() => onGeneratePXL(true)}
                  className="btn-display h-1 w-1 rounded-full"
                >
                  <RotateCcw size={18} />
                </Button>
              </Tooltip>
            </div>
            <Button className="text-base h-12" onClick={onNextStep}>
              Next
            </Button>
          </section>
        </div>
      </Card>
    </section>
  );
}
