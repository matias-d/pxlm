import { SPECIAL_COMBOS } from "@/helpers/consts/pxl-config";
import { Tooltip } from "./tooltip";
import { cn } from "@/lib/cn";
import Card from "./card";

interface Props {
  bonuses: string[];
}

const COMBO_CONFIG = [
  {
    key: "GOLDEN_SET",
    label: "Golden Set",
    classTooltip: "bg-[#716527]/80 text-[#ffd700]",
    classCard: "bg-[#7F6800] border-[#BBA015] glow-once-infinite",
    imgSrc: "/assets/set_golden.svg",
  },
  {
    key: "SILVER_SET",
    label: "Silver Set",
    classTooltip: "bg-[#555555]/80  text-[#c0c0c0]",
    classCard: "bg-[#666666] border-[#7B7B7B]",
    imgSrc: "/assets/set_silver.svg",
  },
  {
    key: "GENTLEMAN",
    label: "Gentleman",
    classCard: "",
    classTooltip: "",
    imgSrc: "/assets/gentleman.svg",
  },
];

export default function SpecialCombo({ bonuses }: Props) {
  const bonusSets = bonuses.filter((bonus) => bonus !== "Fully Loaded");

  return (
    <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 flex items-center gap-x-2">
      {bonusSets.map((bonus) => {
        const combo = COMBO_CONFIG.find(
          (c) =>
            SPECIAL_COMBOS[c.key as keyof typeof SPECIAL_COMBOS].name === bonus
        );
        if (!combo) return null;
        return (
          <Tooltip
            key={bonus}
            content={`Special Combo: ${combo.label}`}
            className="whitespace-nowrap "
            contentClassName={cn(
              "text-xs font-semibold font-display bg-[#555]/80 rounded-md",
              combo.classTooltip
            )}
          >
            <Card
              className={cn(
                "rounded-full overflow-hidden p-1 size-16",
                combo.classCard
              )}
            >
              <div className="rounded-full overflow-hidden">
                <img src={combo.imgSrc} className="" />
              </div>
            </Card>
          </Tooltip>
        );
      })}
    </div>
  );
}
