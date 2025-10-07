import type { IPxl } from "@/interfaces/pxl";

interface Props {
  selected: IPxl;
}

export default function ItemImage({ selected }: Props) {
  return (
    <section className="flex-1 px-14 pt-8 border-r border-border h-full relative">
      <div className="h-[calc(100%-4rem)] p-6 border border-border bg-card-dark rounded-md">
        <img
          key={selected?.tokenId}
          alt={`PXL Media #${selected?.tokenId}`}
          src={selected?.image}
          className="w-full h-full object-cover shadow rounded-md"
        />
      </div>
    </section>
  );
}
