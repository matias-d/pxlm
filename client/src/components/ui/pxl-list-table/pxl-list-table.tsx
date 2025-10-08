import type { IPxl } from "@/interfaces/pxl";
import PxlTableCard from "./pxl-table-card";

interface Props {
  items: IPxl[];
}
export default function PxlListTable({ items }: Props) {
  return (
    <div className="overflow-x-auto">
      <section className="font-display min-w-[1250px] lg:min-w-full">
        <header className="grid grid-cols-8 py-4 border-b border-border ">
          <p className="text-text-secondary text-sm font-medium "></p>
          <p className="text-text-secondary text-sm font-medium lg:-ml-28"></p>
          <p className="text-text-secondary text-sm font-medium">SCORE</p>
          <p className="text-text-secondary text-sm font-medium">RARITY</p>
          <p className="text-text-primary text-sm font-medium">PRICE</p>
          <p className="text-text-secondary text-sm font-medium">LAST SALE</p>
          <p className="text-text-secondary text-sm font-medium">OWNER</p>
          <p className="text-text-secondary font-display text-sm font-medium">
            LISTED
          </p>
        </header>
        <section className="grid grid-cols-1  items-center">
          {items.map((pxl) => (
            <PxlTableCard pxl={pxl} key={pxl.tokenId} />
          ))}
        </section>
      </section>
    </div>
  );
}
