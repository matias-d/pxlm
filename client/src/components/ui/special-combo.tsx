import { SPECIAL_COMBOS } from "@/helpers/consts/pxl-config";

interface Props {
  bonuses: string[];
}

export default function SpecialCombo({ bonuses }: Props) {
  const bonusSets = bonuses.filter((bonus) => bonus !== "Fully Loaded");

  return (
    <div className="flex items-center gap-x-2">
      {bonusSets.map((bonus) => (
        <>
          {bonus === SPECIAL_COMBOS.GOLDEN_SET.name && (
            <p className="text-[10px] font-semibold font-display bg-[#716527]/80 rounded-sm px-1 py-0.5 text-[#ffd700] glow-once-infinite">
              GOLDEN SET 🥇
            </p>
          )}

          {bonus === SPECIAL_COMBOS.SILVER_SET.name && (
            <p className="text-[10px] font-semibold font-display bg-[#949494]/40 rounded-sm px-1 py-0.5 text-[#c0c0c0] ">
              SILVER SET 🥈
            </p>
          )}

          {bonus === SPECIAL_COMBOS.GENTLEMAN.name && (
            <p className="text-[10px] font-semibold font-display bg-gray-700/80 rounded-sm px-1 py-0.5 text-black ">
              GENTLEMAN 🕴
            </p>
          )}
        </>
      ))}
    </div>
  );
}
