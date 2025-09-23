import { RARITY_SYSTEM } from "../consts/pxl-config";

// Get rarity system data by rarityScore
export function getRarityTier(rarityScore: number) {
  if (rarityScore >= RARITY_SYSTEM.LEGENDARY.minScore)
    return RARITY_SYSTEM.LEGENDARY;
  if (rarityScore >= RARITY_SYSTEM.EPIC.minScore) return RARITY_SYSTEM.EPIC;
  if (rarityScore >= RARITY_SYSTEM.RARE.minScore) return RARITY_SYSTEM.RARE;

  return RARITY_SYSTEM.COMMON;
}

export const getRarityMapper = (rarity: number) => {
  if (rarity >= RARITY_SYSTEM.LEGENDARY.minScore)
    return {
      label: RARITY_SYSTEM.LEGENDARY.name,
      class: `${RARITY_SYSTEM.LEGENDARY.tailwind.bg} ${RARITY_SYSTEM.LEGENDARY.tailwind.text} `,
      probabilities: RARITY_SYSTEM.LEGENDARY.probabilities,
      text: RARITY_SYSTEM.LEGENDARY.tailwind.text,
    };
  if (rarity >= RARITY_SYSTEM.EPIC.minScore)
    return {
      label: RARITY_SYSTEM.EPIC.name,
      class: `${RARITY_SYSTEM.EPIC.tailwind.bg} ${RARITY_SYSTEM.EPIC.tailwind.text} `,
      probabilities: RARITY_SYSTEM.EPIC.probabilities,
      text: RARITY_SYSTEM.EPIC.tailwind.text,
    };
  if (rarity >= RARITY_SYSTEM.RARE.minScore)
    return {
      label: RARITY_SYSTEM.RARE.name,
      class: `${RARITY_SYSTEM.RARE.tailwind.bg} ${RARITY_SYSTEM.RARE.tailwind.text} `,
      probabilities: RARITY_SYSTEM.RARE.probabilities,
      text: RARITY_SYSTEM.RARE.tailwind.text,
    };

  return {
    label: RARITY_SYSTEM.COMMON.name,
    class: `${RARITY_SYSTEM.COMMON.tailwind.bg} ${RARITY_SYSTEM.COMMON.tailwind.text}`,
    probabilities: RARITY_SYSTEM.COMMON.probabilities,
    text: RARITY_SYSTEM.COMMON.tailwind.text,
  };
};
