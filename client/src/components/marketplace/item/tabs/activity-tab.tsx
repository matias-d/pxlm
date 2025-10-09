import type { IPxl } from "@/interfaces/pxl";
import ActivityCard from "./activity-card";
import useHistory from "@/hooks/useHistory";
import { Handbag, Tag } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  selected: IPxl;
}

type FilterType = "all" | "listing" | "sale";

export default function ActivityTab({ selected }: Props) {
  const { hasPreviousListings } = useHistory({ item: selected });
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredListings =
    filter === "all"
      ? selected.previousListings ?? []
      : (selected.previousListings ?? []).filter(
          (item) => item.type === filter
        );

  return (
    <section className="">
      <div className="bg-card border-t border-x border-border rounded-t-sm p-4 flex items-center gap-x-4">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "border px-2 py-1  cursor-pointer text-xs md:text-sm rounded-sm flex items-center gap-x-2 font-medium font-display border-border",
            filter === "all" && " bg-card-super-light border-[#332F3E]"
          )}
        >
          <p>All</p>
        </button>
        <button
          onClick={() => setFilter("listing")}
          className={cn(
            "border px-2 py-1  cursor-pointer text-xs md:text-sm rounded-sm flex items-center gap-x-2 font-medium font-display border-border",
            filter === "listing" && " bg-card-super-light border-[#332F3E]"
          )}
        >
          <Tag size={18} />
          <p>Listing</p>
        </button>
        <button
          onClick={() => setFilter("sale")}
          className={cn(
            "border px-2 py-1  cursor-pointer text-xs md:text-sm rounded-sm flex items-center gap-x-2 font-medium font-display border-border",
            filter === "sale" && " bg-card-super-light border-[#332F3E]"
          )}
        >
          <Handbag size={18} />
          <p>Sale</p>
        </button>
      </div>

      <div className="overflow-x-auto">
        <section className="min-w-[640px] lg:min-w-full">
          <div className="grid grid-cols-5 w-full gap-x-4 border-border border px-4 py-3 bg-card">
            <p className="text-xs text-text-secondary">EVENT</p>
            <p className="text-xs text-text-secondary">PRICE</p>
            <p className="text-xs text-text-secondary">FROM</p>
            <p className="text-xs text-text-secondary">TO</p>
            <p className="text-xs text-text-secondary">TIME</p>
          </div>

          {hasPreviousListings ? (
            <>
              {filteredListings.map((item) => (
                <ActivityCard key={item.itemId} item={item} />
              ))}
            </>
          ) : (
            <section className="w-full px-4 py-3 bg-card border-x border-b border-border">
              <p className="text-center text-text-secondary">
                This pxl has no activity.
              </p>
            </section>
          )}
        </section>
      </div>
    </section>
  );
}
