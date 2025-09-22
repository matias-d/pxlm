import { getRarityTier } from "@/helpers/functions/pxl-get-rarity";
import { Sparkle } from "lucide-react";
import ButtonUI from "../ui/button";
import CardUI from "../ui/card";
import { cn } from "@/lib/cn";

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <CardUI className="group relative overflow-hidden hover:scale-[1.01] transition-all duration-300 ease-in-out">
      {children}
    </CardUI>
  );
}

export function FooterContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <footer
      className={cn(
        "absolute -bottom-full group-hover:bottom-0 transition-all duration-300 ease-in-out w-full left-0",
        className
      )}
    >
      {children}
    </footer>
  );
}

export function Button({
  className,
  classNameContainer,
  price,
}: {
  className?: string;
  classNameContainer?: string;
  price: string;
}) {
  return (
    <ButtonUI
      className={cn(
        "w-full h-14 text-base flex items-center rounded-none",
        className
      )}
      classNameContainer={cn(
        "text-sm flex items-center justify-between w-full font-semibold",
        classNameContainer
      )}
    >
      <span>Buy Now</span>
      <p>
        {price} <span className="font-primary">TBNB</span>
      </p>
    </ButtonUI>
  );
}

export function PriceDetails({ price }: { price: string }) {
  return (
    <div>
      <div className="flex items-center gap-x-2 font-semibold mb-0.5">
        <p className="font-display">{price}</p>
        <p className="text-text-secondary">TBNB</p>
      </div>
      <div className="flex items-center gap-x-1 text-xs font-semibold">
        <p className=" text-text-secondary">Last sale</p>
        <p className="font-display ">
          1.40 <span className="text-text-secondary font-primary">TBNB</span>
        </p>
      </div>
    </div>
  );
}

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

export default {
  Card,
  FooterContent,
  Button,
  PriceDetails,
  Info,
};
