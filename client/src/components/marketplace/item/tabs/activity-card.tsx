import type { PreviousListings } from "@/interfaces/pxl";
import { shortenAddress } from "@/utils/shorten-address";
import { getTimeAgo } from "@/utils/get-time-ago";
import { Handbag, Tag } from "lucide-react";
import { ethers } from "ethers";

interface Props {
  item: PreviousListings;
}

export default function ActivityCard({ item }: Props) {
  return (
    <div className="grid grid-cols-5 w-full px-4 gap-x-4 py-3 bg-card border-x border-b border-border">
      <p className="text-sm font-display font-medium flex items-center gap-x-2">
        {item.type === "sale" ? (
          <>
            {" "}
            <Handbag size={14} /> Sale{" "}
          </>
        ) : (
          <>
            {" "}
            <Tag size={14} /> Listing
          </>
        )}
      </p>
      <p className="text-sm font-display font-medium">
        {item.price} <span className="text-xs text-text-secondary">TBNB</span>
      </p>
      <p className="text-sm font-display font-medium">
        {shortenAddress(item.seller)}
      </p>
      <p className="text-sm font-display font-medium">
        {item.buyer === ethers.ZeroAddress
          ? "PXLM"
          : `${shortenAddress(item.buyer)}`}
      </p>
      <p className="text-sm font-display font-medium">
        {getTimeAgo(Number(item.boughtAt) * 1000)}
      </p>
    </div>
  );
}
