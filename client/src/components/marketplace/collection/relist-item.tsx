import DisclousureUI from "@/components/ui/disclousure-ui";
import { shortenAddress } from "@/utils/shorten-address";
import SpecialCombo from "@/components/ui/special-combo";
import { formatTimestamp } from "@/utils/formatTimestamp";
import useMarketplace from "@/hooks/useMarketplace";
import Loading from "@/components/ui/loading";
import type { IPxl } from "@/interfaces/pxl";
import TraitCard from "../create/trait-card";
import Rarity from "@/components/ui/rarity";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/cn";
import Error from "@/components/ui/error";

interface Props {
  items: IPxl[];
  loading: boolean;
}

const traitsType = ["Hat", "Beard", "Accesory", "Glasses"];

export default function RelistItem({ items, loading }: Props) {
  const { relistNFT, account } = useMarketplace();

  const [selected, setSelected] = useState<IPxl>(items[0]);
  const [status, setStatus] = useState({
    load: false,
    error: false,
  });
  const [price, setPrice] = useState(selected.price);

  const onPrice = (newPrice: string) => setPrice(newPrice);
  const onSelected = (pxl: IPxl) => setSelected(pxl);

  const owner =
    (account?.address && shortenAddress(account?.address)) || "Uknowed user";

  const traits = selected.attributes.filter((attr) =>
    traitsType.includes(attr.trait_type)
  );

  const onRelist = async () => {
    setStatus((prev) => ({ ...prev, load: true }));
    try {
      await relistNFT(selected.tokenId, price);
      onClear();
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, load: false }));
    }
  };

  const onClear = () => {
    const nextNFT = items.find((pxl) => pxl.tokenId !== selected.tokenId);
    setSelected(nextNFT!);
    setPrice(nextNFT?.price || "");
  };

  if (loading)
    return <Loading label="Obtaining purchased collection" withIcon />;

  if (status.error)
    return (
      <Error
        action={() => (
          <Button asChild className="h-12 text-sm ">
            Try again
          </Button>
        )}
        title="An error occurred while relisting the NFT."
      />
    );

  return (
    <section className="flex flex-col items-center justify-cente">
      <div className="flex items-center gap-x-4">
        {items.map((pxl) => (
          <button
            onClick={() => onSelected(pxl)}
            className={cn(
              "rounded-lg overflow-hidden cursor-pointer",
              selected === pxl
                ? "ring-2 ring-accent ring-offset-4 ring-offset-card "
                : "grayscale-50 hover:ring-2 hover:ring-accent hover:ring-offset-4 hover:ring-offset-card transition-all hover:grayscale-0 "
            )}
          >
            <img
              key={pxl.tokenId}
              alt={`PXL Media #${pxl.tokenId}`}
              src={pxl.image}
              className="size-20"
            />
          </button>
        ))}
      </div>
      <div className="my-6 h-[1px] w-full bg-border" />

      <section>
        <Card className=" grid grid-cols-2 p-6  gap-x-6 ">
          <div className="relative">
            <div className="group relative inline-flex overflow-hidden rounded-md w-[25rem] h-[27.5rem] ">
              <img
                key={selected.tokenId}
                alt={`PXL Media #${selected.tokenId}`}
                src={selected.image}
                className=" w-full shadow object-cover"
              />
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </div>
            <SpecialCombo
              bonuses={selected.attributes.map((attr) => attr.value)}
            />
          </div>
          <div>
            <section className="flex flex-col justify-between h-full ">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-display  font-semibold text-sm">
                    TRAITS{" "}
                    <span className="text-text-secondary">
                      {selected.attributes.length}
                    </span>
                  </h4>
                  <div className="flex items-center gap-x-2">
                    <p className="text-sm font-display font-semibold">
                      RARITY{" "}
                      <span className="text-accent">
                        #{selected.rarity_score}
                      </span>
                    </p>
                    <Rarity rarity={selected.rarity_score} />
                  </div>
                </div>
                <DisclousureUI
                  title="TRAITS"
                  classNamePanel={cn(
                    "absolute w-full -bottom-[10rem] left-0 z-20",
                    traits.length > 2 ? "-bottom-[10rem]" : "-bottom-[6rem]"
                  )}
                >
                  {traits.length > 0 ? (
                    <Card>
                      <div className="grid grid-cols-2 gap-2 ">
                        {traits.map((trait) => (
                          <TraitCard
                            trait={trait}
                            key={trait.trait_type}
                            className="p-2 w-auto"
                          />
                        ))}
                      </div>
                    </Card>
                  ) : (
                    <Card className="">
                      <div className="h-[3.563rem] flex items-center justify-center">
                        <p className="text-text-secondary">
                          This PXL has no traits.
                        </p>
                      </div>
                    </Card>
                  )}
                </DisclousureUI>
              </div>
              <div>
                <h4 className="font-display mb-2 font-semibold text-sm">
                  DETAILS
                </h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Card className="bg-card-dark  relative ">
                    <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                      NAME
                    </p>

                    <p className="text-sm">{selected.name}</p>
                  </Card>
                  <Card className="bg-card-dark  relative ">
                    <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                      PRICE
                    </p>

                    <p className="text-sm">{selected.price} TBNB</p>
                  </Card>

                  <Card className="bg-card-dark  relative ">
                    <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                      OWNER
                    </p>

                    <p className="text-sm">{owner}</p>
                  </Card>
                  <Card className="bg-card-dark  relative ">
                    <p className="text-xs uppercase text-text-secondary font-display font-semibold">
                      MINTED AT
                    </p>

                    <p className="text-sm">
                      {formatTimestamp(selected.minted_at)}
                    </p>
                  </Card>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      onChange={(e) => onPrice(e.target.value)}
                      label="Marketplace Price"
                      placeholder="0.001"
                      value={price}
                      type="number"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex  items-center justify-end">
                <Button
                  loading={status.load}
                  disabled={status.load}
                  onClick={onRelist}
                  className="h-12 disabled:bg-accent/95"
                >
                  🎉 Relist PXL
                </Button>
              </div>
            </section>
          </div>
        </Card>
      </section>
    </section>
  );
}
