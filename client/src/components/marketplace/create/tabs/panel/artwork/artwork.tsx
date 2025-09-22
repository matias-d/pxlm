import TabArtworkSkeleton from "../../../skeletons/tab-artwork-skeleton";
import SpecialCombo from "@/components/ui/special-combo";
import type { IPxlCreate } from "@/interfaces/pxl";
import { Tooltip } from "@/components/ui/tooltip";
import ContainerPanel from "../container-panel";
import Button from "@/components/ui/button";
import Rarity from "@/components/ui/rarity";
import TraitCard from "../../../trait-card";
import { CircleAlert } from "lucide-react";
import Error from "@/components/ui/error";
import Card from "@/components/ui/card";
import ButtonTry from "./button-try";

interface Props {
  loading: boolean;
  pxl: IPxlCreate;
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
    <ContainerPanel pxl={pxl}>
      <div className=" flex flex-col justify-between ">
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
            <div className="flex items-center justify-between  mb-2 ">
              <h4 className="font-display font-semibold text-sm">
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
          <Card className="p-3 bg-card-dark">
            <div>
              <h3 className="text-sm text-text-secondary">PRICE</h3>
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-xl">
                  {pxl.price} TBNB
                </p>
                <Tooltip
                  content="Recommended Price"
                  contentClassName="bg-card-super-light"
                >
                  <div className="text-text-secondary transition-all rounded-full p-1.5 hover:text-text-primary">
                    <CircleAlert size={20} />
                  </div>
                </Tooltip>
              </div>
            </div>
          </Card>
        </section>

        <section className="flex justify-between w-full items-center gap-x-4">
          <ButtonTry onGeneratePXL={onGeneratePXL} />
          <Button className="text-base h-12" onClick={onNextStep}>
            Next
          </Button>
        </section>
      </div>
    </ContainerPanel>
  );
}
