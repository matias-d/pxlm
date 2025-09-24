import { getRarityTier } from "@/helpers/functions/pxl-get-rarity";
import type { IPxl } from "@/interfaces/pxl";
import { BadgeCheck } from "lucide-react";
import Card from "@/components/ui/card";
import { cn } from "@/lib/cn";

export default function Checkout({ pxl }: { pxl: IPxl }) {
  const options = pxl ? getRarityTier(pxl.rarity_score) : null;

  return (
    <div>
      <h2 className="text-2xl font-accent text-accent font-semibold mb-6">
        Checkout
      </h2>
      <Card className="bg-transparent border-none flex items-center p-0 justify-between">
        <div className="flex items-center gap-x-3">
          <img src={pxl.image} className="size-12 rounded-md" />
          <div className="flex flex-col items-start gap-x-2">
            <h4 className="font-semibold font-display flex items-center gap-x-2">
              {pxl.name} <BadgeCheck className="text-accent" size={18} />
            </h4>
            <div className="flex items-center gap-x-1">
              <p className="text-xs text-text-primary/80">
                #{pxl.rarity_score}
              </p>
              {options && (
                <p
                  className={cn(
                    "text-xs px-1 rounded-sm border font-display font-semibold capitalize",
                    options.tailwind.bg,
                    options.tailwind.text
                  )}
                >
                  {options.name}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <p className="font-semibold font-display">{pxl.price} TBNB</p>
          <p className="text-sm text-text-primary/60">$1.2</p>
        </div>
      </Card>

      <hr className="w-full line-border my-4" />

      <div className="flex items-center justify-between">
        <p className="font-semibold font-display text-sm">TOTAL</p>
        <div className="flex flex-col items-end">
          <p className="font-semibold font-display">{pxl.price} TBNB</p>
          <p className="text-sm text-text-primary/60">$1.2</p>
        </div>
      </div>
    </div>
  );
}
