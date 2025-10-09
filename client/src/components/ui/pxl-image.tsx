import useMarketplace from "@/hooks/useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import { Check, Plus } from "lucide-react";
import OwnersImage from "./owners-image";
import useCart from "@/hooks/useCart";
import { cn } from "../../lib/cn";

interface Props {
  classNameContainer?: string;
  className?: string;
  pxl: IPxl;
  alt: string;
}

export default function PXLImage({
  alt,
  pxl,
  className,
  classNameContainer,
}: Props) {
  const { account } = useMarketplace();
  const { addCart, inCart, removeCart } = useCart();

  const found = inCart(pxl.itemId);

  const onCart = () => (found ? removeCart(pxl.itemId) : addCart(pxl));

  const isSeller = pxl.seller === account?.address;
  const isOwner = pxl.owner === account?.address;
  const isSold = pxl.sold;

  return (
    <div className="relative">
      {isOwner && (
        <div className="absolute top-2 right-2 z-20">
          <p className="text-xs bg-accent/95 text-[#D445AB] font-semibold border border-accent px-2 rounded-md">
            Owned
          </p>
        </div>
      )}

      <div
        className={cn(
          "group relative inline-flex overflow-hidden rounded-md w-full",
          classNameContainer
        )}
      >
        {!isSeller && !isOwner && !isSold && (
          <div
            className={cn(
              "absolute right-2 top-2 z-10 translate-y-1 opacity-100 lg:opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all",
              found && "opacity-100 translate-y-0"
            )}
          >
            <button
              onClick={onCart}
              className={cn(
                " rounded-full p-1 cursor-pointer transition-colors",
                found ? "bg-accent" : "bg-black/50 hover:bg-black/60 "
              )}
            >
              {!found ? (
                <Plus size={28} />
              ) : (
                <Check size={28} className="text-white" />
              )}
            </button>
          </div>
        )}

        <img
          src={pxl.image}
          alt={alt}
          height={246.25}
          width={246.25}
          loading="lazy"
          className={cn("object-cover shadow w-full", className)}
        />
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </div>
      <OwnersImage pxl={pxl} />
    </div>
  );
}
