import { RARITY_SYSTEM } from "@/helpers/consts/pxl-config";
import { Tooltip } from "./tooltip";
import { cn } from "@/lib/cn";

interface Props {
  rarity: number;
}

const getRarity = (rarity: number) => {
  if (rarity >= RARITY_SYSTEM.LEGENDARY.minScore)
    return {
      label: RARITY_SYSTEM.LEGENDARY.name,
      class: `${RARITY_SYSTEM.LEGENDARY.tailwind.bg} ${RARITY_SYSTEM.LEGENDARY.tailwind.text}`,
      probabilities: RARITY_SYSTEM.LEGENDARY.probabilities,
      text: RARITY_SYSTEM.LEGENDARY.tailwind.text,
    };
  if (rarity >= RARITY_SYSTEM.EPIC.minScore)
    return {
      label: RARITY_SYSTEM.EPIC.name,
      class: `${RARITY_SYSTEM.EPIC.tailwind.bg} ${RARITY_SYSTEM.EPIC.tailwind.text}`,
      probabilities: RARITY_SYSTEM.EPIC.probabilities,
      text: RARITY_SYSTEM.EPIC.tailwind.text,
    };
  if (rarity >= RARITY_SYSTEM.RARE.minScore)
    return {
      label: RARITY_SYSTEM.RARE.name,
      class: `${RARITY_SYSTEM.RARE.tailwind.bg} ${RARITY_SYSTEM.RARE.tailwind.text}`,
      probabilities: RARITY_SYSTEM.RARE.probabilities,
      text: RARITY_SYSTEM.RARE.tailwind.text,
    };
  if (rarity >= RARITY_SYSTEM.UNCOMMON.minScore)
    return {
      label: RARITY_SYSTEM.UNCOMMON.name,
      class: `${RARITY_SYSTEM.UNCOMMON.tailwind.bg} ${RARITY_SYSTEM.UNCOMMON.tailwind.text}`,
      probabilities: RARITY_SYSTEM.UNCOMMON.probabilities,
      text: RARITY_SYSTEM.UNCOMMON.tailwind.text,
    };
  return {
    label: RARITY_SYSTEM.COMMON.name,
    class: `${RARITY_SYSTEM.COMMON.tailwind.bg} ${RARITY_SYSTEM.COMMON.tailwind.text}`,
    probabilities: RARITY_SYSTEM.COMMON.probabilities,
    text: RARITY_SYSTEM.COMMON.tailwind.text,
  };
};

export default function Rarity({ rarity }: Props) {
  const options = getRarity(rarity);

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
