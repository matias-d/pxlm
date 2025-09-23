import { getRarityMapper } from "@/helpers/functions/pxl-get-rarity";
import { RARITY_SYSTEM } from "@/helpers/consts/pxl-config";
import { Tooltip } from "./tooltip";
import { cn } from "@/lib/cn";

interface Props {
  rarity: number;
}

export default function Rarity({ rarity }: Props) {
  const options = getRarityMapper(rarity);

  return (
    <Tooltip
      content={`Probabilities: ${options.probabilities}`}
      contentClassName={cn(
        "bg-card-super-light whitespace-nowrap",
        options.text
      )}
    >
      <div
        className={cn(
          "text-sm px-1 rounded-sm font-display font-semibold flex items-center gap-x-0.5 uppercase group relative overflow-hidden",
          options.class,
          rarity >= RARITY_SYSTEM.EPIC.minScore && "group",
          rarity >= RARITY_SYSTEM.LEGENDARY.minScore && "glow-once"
        )}
      >
        <span> {options.label}</span>
        {rarity >= RARITY_SYSTEM.EPIC.minScore && (
          <div className="absolute inset-0 flex h-full w-full justify-center animate-shine">
            <div className="relative h-full w-8 bg-white/20"></div>
          </div>
        )}
      </div>
    </Tooltip>
  );
}
