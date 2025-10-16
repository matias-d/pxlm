import { getRarityTier } from "@/helpers/functions/pxl-get-rarity";
import useMarketplace from "@/hooks/useMarketplace";
import { Link, useNavigate } from "react-router";
import type { IPxl } from "@/interfaces/pxl";
import useHistory from "@/hooks/useHistory";
import { Sparkle } from "lucide-react";
import useCart from "@/hooks/useCart";
import Button from "./button";
import { cn } from "@/lib/cn";
import CardUI from "./card";

// Principal Card
export function Card({
  children,
  itemId,
}: {
  children: React.ReactNode;
  itemId: number;
}) {
  const { inCart } = useCart();
  const found = inCart(itemId);

  const navigate = useNavigate();

  const onNavigate = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button")) return;
    navigate(`/marketplace/item/${itemId}`, {
      state: { from: window.location.pathname },
    });
  };

  return (
    <CardUI
      onClick={onNavigate}
      className={cn(
        "group relative overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out",
        found && "border-accent border-2"
      )}
    >
      {children}
    </CardUI>
  );
}

// Footer dinamyc content
export function FooterContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <footer
        className={cn(
          "absolute -bottom-full group-hover:bottom-0 transition-all duration-300 ease-in-out w-full left-0",
          className
        )}
      >
        {children}
      </footer>
    </>
  );
}

// Info (name, token, rarity) of pxl
export function Info({
  rarity_score,
  tokenId,
}: {
  rarity_score: number;
  tokenId: number;
}) {
  const rarityConfig = getRarityTier(rarity_score);

  return (
    <section className="flex items-center justify-between my-3">
      <div className="flex items-center gap-x-1 font-semibold ">
        <h2 className="text-text-primary  ">PXL ART</h2>
        <p className="font-display">#{tokenId}</p>
      </div>

      <div className="flex items-center gap-x-1">
        <p
          className={cn(
            "font-display text-sm font-semibold bg-card-super-light px-1 rounded-md flex items-center gap-x-1",
            rarityConfig.tailwind.text
          )}
        >
          <Sparkle size={15} />#{rarity_score}
        </p>
      </div>
    </section>
  );
}

// Price of NFT and owner
export function PriceDetails({ pxl }: { pxl: IPxl }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-x-2 font-semibold mb-0.5">
          <p className="font-display">{pxl.price}</p>
          <p className="text-text-secondary">TBNB</p>
        </div>

        <LastPrice pxl={pxl} />
      </div>
      {pxl.sold && (
        <div>
          <span className="text-xs bg-accent-firthy/15 font-display p-1 rounded-sm text-accent-firthy font-semibold">
            Sold out
          </span>
        </div>
      )}
    </div>
  );
}

export const LastPrice = ({ pxl }: { pxl: IPxl }) => {
  const { lastSale } = useHistory({ item: pxl });

  if (!lastSale) return null;

  return (
    <div className="flex items-center gap-x-1 text-xs font-semibold">
      <p className="text-text-secondary">Last sale</p>
      <p className="font-display">
        {lastSale.price}{" "}
        <span className="text-text-secondary font-primary">TBNB</span>
      </p>
    </div>
  );
};

// Type buttons card
export function ButtonCard({
  pxl,
  onClick,
}: {
  pxl: IPxl;
  onClick: () => void;
}) {
  const { account } = useMarketplace();

  const isSeller = pxl.seller === account?.address;
  const isOwner = pxl.owner === account?.address;
  const isSold = pxl.sold;

  return (
    <>
      {isOwner && isSold ? (
        <Button
          className="w-full h-14 text-base rounded-none font-semibold bg-accent-secondary ring-accent-secondary"
          asChild
          classNameContainer="flex items-center gap-x-2"
        >
          <Link to="/marketplace/collection?filter=purchased">Purchased</Link>
        </Button>
      ) : isSeller ? (
        <Button
          className="rounded-none text-base h-14 w-full bg-accent-firthy ring-accent-firthy"
          asChild
        >
          <Link to="/marketplace/collection">Collection</Link>
        </Button>
      ) : !isSold ? (
        <Button
          onClick={onClick}
          className={cn("w-full h-14 text-base flex items-center rounded-none")}
          classNameContainer={cn(
            "flex items-center justify-between w-full font-semibold"
          )}
        >
          <span>Buy Now</span>
          <p>
            {pxl.price} <span className="font-primary">TBNB</span>
          </p>
        </Button>
      ) : (
        <Button
          className={cn("w-full h-14 text-base flex items-center rounded-none")}
          classNameContainer={cn(
            "flex items-center justify-between w-full font-semibold"
          )}
        >
          Sold out
        </Button>
      )}
    </>
  );
}

export default {
  Card,
  FooterContent,
  PriceDetails,
  Info,
  ButtonCard,
};
