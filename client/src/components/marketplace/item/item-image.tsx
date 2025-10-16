import SpecialCombo from "@/components/ui/special-combo";
import type { IPxl } from "@/interfaces/pxl";

interface Props {
  selected: IPxl;
  bonuses: string[];
}

export default function ItemImage({ selected, bonuses }: Props) {
  return (
    <section className="flex-1 p-4 lg:px-14 lg:pt-8 border-r border-border h-full relative bg-card w-full">
      <div className="lg:h-[calc(100%-4rem)] lg:p-6 lg:border border-border bg-card-dark rounded-md relative">
        <img
          key={selected?.tokenId}
          alt={`PXL Media #${selected?.tokenId}`}
          src={selected?.image}
          className="w-full h-full object-cover shadow rounded-md"
        />
        <SpecialCombo bonuses={bonuses} className="md:size-18" />
      </div>
    </section>
  );
}
