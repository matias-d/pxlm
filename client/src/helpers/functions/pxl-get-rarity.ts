import { RARITY_SYSTEM } from "../consts/pxl-config";

// Get rarity system data by rarityScore
export function getRarityTier(rarityScore: number) {
  if (rarityScore >= RARITY_SYSTEM.LEGENDARY.minScore)
    return RARITY_SYSTEM.LEGENDARY;
  if (rarityScore >= RARITY_SYSTEM.EPIC.minScore) return RARITY_SYSTEM.EPIC;
  if (rarityScore >= RARITY_SYSTEM.RARE.minScore) return RARITY_SYSTEM.RARE;
  if (rarityScore >= RARITY_SYSTEM.UNCOMMON.minScore)
    return RARITY_SYSTEM.UNCOMMON;
  return RARITY_SYSTEM.COMMON;
}
