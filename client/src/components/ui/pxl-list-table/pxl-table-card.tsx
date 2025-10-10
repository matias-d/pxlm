import { getRarityTier } from "@/helpers/functions/pxl-get-rarity";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import { getTimeAgo } from "@/utils/get-time-ago";
import { Checkbox } from "@headlessui/react";
import type { IPxl } from "@/interfaces/pxl";
import useCart from "@/hooks/useCart";
import { Check } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/cn";

interface Props {
  pxl: IPxl;
}

export default function PxlTableCard({ pxl }: Props) {
  const { addCart, inCart } = useCart();
  const { account } = useMarketplace();
  const location = useLocation();
  const result = inCart(pxl.itemId);
  const rarityConfig = getRarityTier(pxl.rarity_score);

  const isSeller = pxl.seller === account?.address;
  const isOwner = pxl.owner === account?.address;
  const isSold = pxl.sold;

  const isBuy = !isSeller && !isOwner && !isSold;

  return (
    <div
      className="grid grid-cols-8 py-3 border-b border-border items-center hover:bg-card-light px-2 cursor-pointer"
      onClick={() => (isBuy ? addCart(pxl) : null)}
    >
      {isBuy ? (
        <CheckInput inCart={result} addCart={() => addCart(pxl)} />
      ) : (
        <p></p>
      )}

      <div className="flex items-center gap-x-3 -ml-28">
        <img src={pxl.image} className="size-10 rounded-sm" />
        <Link
          to={`/marketplace/item/${pxl.tokenId}`}
          state={{ from: location.pathname }}
          onClick={(e) => e.stopPropagation()}
          className="text-sm"
        >
          {pxl.name}
        </Link>
      </div>
      <p className={cn(" text-sm ", rarityConfig.tailwind.text)}>
        #{pxl.rarity_score}
      </p>
      <p className="capitalize text-sm">{pxl.rarity_tier}</p>
      <p className="text-sm">
        {pxl.price} <span className="text-text-secondary text-xs">TBNB</span>
      </p>
      <p className="text-sm">
        {pxl.previousListings ? (
          <>
            {`${pxl.previousListings[pxl.previousListings.length - 1].price}`}{" "}
            <span className="text-text-secondary text-xs">TBNB</span>
          </>
        ) : (
          "-"
        )}
      </p>
      <p className="text-sm">{shortenAddress(pxl.owner)}</p>
      <p className="text-sm">{getTimeAgo(pxl.minted_at)}</p>
    </div>
  );
}

function CheckInput({
  addCart,
  inCart,
}: {
  inCart: boolean;
  addCart: () => void;
}) {
  return (
    <Checkbox
      checked={inCart}
      onChange={addCart}
      onClick={(e) => e.stopPropagation()}
      className="group size-5 rounded-[6px] bg-card border border-border data-checked:bg-accent   flex items-center justify-center cursor-pointer "
    >
      <div className="size-5 data-checked  items-center justify-center hidden fill-black group-data-checked:flex">
        <Check className="size-4" />
      </div>
    </Checkbox>
  );
}
