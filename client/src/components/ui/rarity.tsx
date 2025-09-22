import { RARITY_SYSTEM } from "@/helpers/consts/pxl-config";
import { cn } from "@/lib/cn";
import { Tooltip } from "./tooltip";

interface Props {
  rarity: number;
}

const getRarity = (rarity: number) => {
  if (rarity >= RARITY_SYSTEM.LEGENDARY.minScore)
    return {
      label: RARITY_SYSTEM.LEGENDARY.name,
      class: `${RARITY_SYSTEM.LEGENDARY.tailwind.bg} ${RARITY_SYSTEM.LEGENDARY.tailwind.text}`,
    };
  if (rarity >= RARITY_SYSTEM.EPIC.minScore)
    return {
      label: RARITY_SYSTEM.EPIC.name,
      class: `${RARITY_SYSTEM.EPIC.tailwind.bg} ${RARITY_SYSTEM.EPIC.tailwind.text}`,
    };
  if (rarity >= RARITY_SYSTEM.RARE.minScore)
    return {
      label: RARITY_SYSTEM.RARE.name,
      class: `${RARITY_SYSTEM.RARE.tailwind.bg} ${RARITY_SYSTEM.RARE.tailwind.text}`,
    };
  if (rarity >= RARITY_SYSTEM.UNCOMMON.minScore)
    return {
      label: RARITY_SYSTEM.UNCOMMON.name,
      class: `${RARITY_SYSTEM.UNCOMMON.tailwind.bg} ${RARITY_SYSTEM.UNCOMMON.tailwind.text}`,
    };
  return {
    label: RARITY_SYSTEM.COMMON.name,
    class: `${RARITY_SYSTEM.COMMON.tailwind.bg} ${RARITY_SYSTEM.COMMON.tailwind.text}`,
  };
};

export default function Rarity({ rarity }: Props) {
  const options = getRarity(rarity);

  return (
    <Tooltip
      content="Only 8%"
      contentClassName="bg-card-super-light whitespace-nowrap"
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
