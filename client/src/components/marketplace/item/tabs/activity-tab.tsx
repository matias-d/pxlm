import type { IPxl } from "@/interfaces/pxl";
import { shortenAddress } from "@/utils/shorten-address";
import { Handbag } from "lucide-react";

interface Props {
  selected: IPxl;
}

export default function ActivityTab({ selected }: Props) {
  return (
    <section>
      <div className="bg-card  border-t border-x border-border  rounded-t-sm p-4">
        <h3 className="flex items-center gap-x-3 font-medium font-display ">
          {" "}
          <div className="border  border-border size-8 rounded-sm flex items-center justify-center">
            <span className=" bg-card-super-light p-1.5 border border-border rounded-sm">
              <Handbag size={18} />
            </span>
          </div>
          Sale
        </h3>
      </div>
      <section className="">
        <div className="grid grid-cols-4 w-full border-border border px-4 py-3 bg-card ">
          <p className="text-xs text-text-secondary">EVENT</p>
          <p className="text-xs text-text-secondary">PRICE</p>
          <p className="text-xs text-text-secondary">FROM</p>
          <p className="text-xs text-text-secondary px-4">STATUS</p>
        </div>
        {selected.previousListings &&
          selected.previousListings.map((item) => (
            <div
              className="grid grid-cols-4 w-full px-4 py-3 bg-card border-x border-b border-border"
              key={item.itemId}
            >
              <p className="text-sm font-display font-medium flex items-center gap-x-2">
                <Handbag size={14} /> Sale
              </p>
              <p className="text-sm font-display font-medium">
                {item.price}{" "}
                <span className="text-xs text-text-secondary">TBNB</span>
              </p>
              <p className="text-sm font-display font-medium">
                {shortenAddress(item.seller)}
              </p>
              <p className="text-sm font-display font-medium px-4">
                {item.sold ? "Sold" : "Pending"}
              </p>
            </div>
          ))}
      </section>
    </section>
  );
}
