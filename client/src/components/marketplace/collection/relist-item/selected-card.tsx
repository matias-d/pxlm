import TraitsDisclousure from "@/components/ui/traits-disclousure";
import PxlHeaderInfo from "@/components/ui/pxl-header-info";
import { formatTimestamp } from "@/utils/formatTimestamp";
import SpecialCombo from "@/components/ui/special-combo";
import { shortenAddress } from "@/utils/shorten-address";
import DetailCard from "@/components/ui/detail-card";
import useMarketplace from "@/hooks/useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Card from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  selected: IPxl;
  items: IPxl[];
  onSelect: (item: IPxl) => void;
}

const traitsType = ["Hat", "Beard", "Accesory", "Glasses"];

export default function SelectedCard({ selected, items, onSelect }: Props) {
  const { relistNFT, account } = useMarketplace();

  const [price, setPrice] = useState(selected?.price || "");
  const [status, setStatus] = useState({
    load: false,
    error: false,
  });
  const onRelist = async () => {
    setStatus((prev) => ({ ...prev, load: true }));
    try {
      await relistNFT(selected!.tokenId, price);
      if (items.length > 1) onClear();
    } catch {
      setStatus((prev) => ({ ...prev, error: true }));
    } finally {
      setStatus((prev) => ({ ...prev, load: false }));
    }
  };
  const onPrice = (newPrice: string) => setPrice(newPrice);

  const onClear = () => {
    const nextNFT = items.find((pxl) => pxl.tokenId !== selected?.tokenId);
    onSelect(nextNFT!);
    setPrice(nextNFT?.price || "");
  };

  const owner =
    (account?.address && shortenAddress(account?.address)) || "Uknowed user";
  const traits = !selected
    ? []
    : selected?.attributes.filter((attr) =>
        traitsType.includes(attr.trait_type)
      );

  return (
    <Card className=" grid grid-cols-1 md:grid-cols-2 p-6  gap-6 ">
      <div className="relative">
        <div className="group relative inline-flex overflow-hidden rounded-md lg:w-[25rem] lg:h-[27.5rem] md:h-full ">
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
        <SpecialCombo bonuses={selected.attributes.map((attr) => attr.value)} />
      </div>
      <div>
        <section className="flex flex-col justify-between h-full mb-6 lg:mb-0">
          <div>
            <PxlHeaderInfo
              rarityScore={selected.rarity_score}
              totalAttr={traits.length}
            />
            <TraitsDisclousure
              attributes={traits}
              classNamePanel={cn(traits.length > 2 && "-bottom-[12rem]")}
            />
          </div>
          <div>
            <h4 className="font-display mb-2 font-semibold text-sm">DETAILS</h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <DetailCard title="name" value={selected.name} />
              <DetailCard title="price" value={`${selected.price} TBNB`} />
              <DetailCard title="owner" value={owner} />
              <DetailCard
                title="minted at"
                value={formatTimestamp(selected.minted_at)}
              />
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
  );
}
