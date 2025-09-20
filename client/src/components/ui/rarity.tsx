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
      class: "bg-yellow-600/30 text-yellow-500",
    };
  if (rarity >= RARITY_SYSTEM.EPIC.minScore)
    return {
      label: RARITY_SYSTEM.EPIC.name,
      class: "bg-indigo-600/30 text-indigo-500",
    };
  if (rarity >= RARITY_SYSTEM.RARE.minScore)
    return {
      label: RARITY_SYSTEM.RARE.name,
      class: "bg-sky-600/30 text-sky-500",
    };
  if (rarity >= RARITY_SYSTEM.UNCOMMON.minScore)
    return {
      label: RARITY_SYSTEM.UNCOMMON.name,
      class: "bg-lime-600/30 text-lime-500",
    };
  return {
    label: RARITY_SYSTEM.COMMON.name,
    class: "bg-gray-600/30 text-gray-500",
  };
};

export default function Rarity({ rarity }: Props) {
  const options = getRarity(rarity);

  return (
    <Tooltip
      content="Only 8%"
      contentClassName="bg-card-super-light whitespace-nowrap"
    >
      <p
        className={cn(
          "text-sm px-1 rounded-sm font-display font-semibold flex items-center gap-x-0.5 uppercase group relative overflow-hidden  ",
          options.class,
          rarity >= RARITY_SYSTEM.EPIC.minScore && "group",
          rarity >= RARITY_SYSTEM.LEGENDARY.minScore && "glow-once"
        )}
      >
        {options.label}
        {rarity >= RARITY_SYSTEM.EPIC.minScore && (
          <div className="absolute inset-0 flex h-full w-full justify-center animate-shine">
            <div className="relative h-full w-8 bg-white/20"></div>
          </div>
        )}
      </p>
    </Tooltip>
  );
}
