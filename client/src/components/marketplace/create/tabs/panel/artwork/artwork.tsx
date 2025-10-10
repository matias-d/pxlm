import TabArtworkSkeleton from "../../../skeletons/tab-artwork-skeleton";
import PxlHeaderInfo from "@/components/ui/pxl-header-info";
import type { IPxlCreate } from "@/interfaces/pxl";
import ContainerPanel from "../container-panel";
import Button from "@/components/ui/button";
import TraitCard from "../../../trait-card";
import Error from "@/components/ui/error";
import AddedPrices from "../added-prices";
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
      <div className=" flex flex-col justify-between gap-y-4 lg:gap-y-0">
        <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-2 lg:gap-0 ">
          <h2 className=" font-accent tracking-wide text-2xl font-bold">
            PXL ART <span className="text-text-secondary text-xl">#0000</span>
          </h2>
          <div className="flex items-center gap-x-1">
            <a
              href="https://www.dicebear.com"
              referrerPolicy="no-referrer"
              target="_blank"
              className="text-xs text-text-secondary hover:underline"
            >
              by DiceBear
            </a>
            <img src="/dicebear-logo.ico" className="size-4 rounded-full" />
          </div>
        </section>

        <section>
          <div>
            <PxlHeaderInfo
              rarityScore={pxl.rarity_score}
              totalAttr={pxl.attributes.length}
            />
            <div className="grid grid-cols-2 gap-2 mb-2">
              {pxl.attributes.map((trait) => (
                <TraitCard trait={trait} key={trait.trait_type} />
              ))}
            </div>
          </div>
          <Card className="p-3 bg-card-dark">
            <div className="h-">
              <h3 className="text-xs lg:text-sm text-text-secondary">PRICE</h3>
              <div className="flex items-center justify-between">
                <p className="font-display font-semibold text-base lg:text-xl">
                  {pxl.price} TBNB
                </p>
                <button></button>
                <AddedPrices addedPrices={pxl.addedPrices} />
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
