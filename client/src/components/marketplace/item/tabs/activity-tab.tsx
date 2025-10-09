import type { IPxl, PreviousListings } from "@/interfaces/pxl";
import ActivityCard from "./activity-card";
import useHistory from "@/hooks/useHistory";
import { Handbag } from "lucide-react";

interface Props {
  selected: IPxl;
}

export default function ActivityTab({ selected }: Props) {
  const activity: PreviousListings = {
    seller: selected.seller,
    buyer: selected.buyer,
    price: selected.price,
    sold: selected.sold,
    itemId: selected.itemId,
    boughtAt: selected.boughtAt,
  };

  const { hasActivity, hasValidBuyer, hasValidBoughtAt, hasPreviousListings } =
    useHistory({ item: selected });

  return (
    <section className="">
      <div className="bg-card border-t border-x border-border rounded-t-sm p-4">
        <h3 className="flex items-center gap-x-3 font-medium font-display">
          <div className="border border-border size-8 rounded-sm flex items-center justify-center">
            <span className="bg-card-super-light p-1.5 border border-border rounded-sm">
              <Handbag size={18} />
            </span>
          </div>
          Sale
        </h3>
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

          {hasActivity ? (
            <>
              {hasValidBuyer && hasValidBoughtAt && (
                <ActivityCard item={activity} />
              )}
              {hasPreviousListings &&
                (selected.previousListings ?? []).map((item) => (
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
