import Rarity from "./rarity";

interface Props {
  totalAttr: number;
  rarityScore: number;
}

export default function PxlHeaderInfo({ rarityScore, totalAttr }: Props) {
  return (
    <div className="flex items-center justify-between  mb-2 ">
      <h4 className="font-display font-semibold text-sm">
        TRAITS <span className="text-text-secondary">{totalAttr}</span>
      </h4>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-display font-semibold">
          RARITY <span className="text-accent">#{rarityScore}</span>
        </p>
        <Rarity rarity={rarityScore} />
      </div>
    </div>
  );
}
