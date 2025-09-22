import {
  accessoryColorNames,
  accessoryNames,
  beardNames,
  colorNames,
  COLORS_VALUE,
  CONFIG,
  glassesColorNames,
  glassesNames,
  hatNames,
  PREMIUM_COLORS,
  SPECIAL_COMBOS,
} from "@/helpers/consts/pxl-config";
import { getColorHex } from "@/helpers/functions/pxl-color-hex";
import { getRarityTier } from "@/helpers/functions/pxl-get-rarity";

import {
  createDeterministicHash,
  selectRandom,
  shouldIncludeAttribute,
} from "@/helpers/functions/pxl-posibilities";
import type { IAttribute } from "@/interfaces/attributes";

const DICE_BEAR_API = "https://api.dicebear.com/9.x/pixel-art/svg";

export function generatePXL({ address }: { address: string }) {
  const timestamp = Date.now();
  const hash = createDeterministicHash(address, timestamp);
  const seed = address.slice(-8) + timestamp.toString().slice(-4);

  const params = new URLSearchParams({
    seed: seed,
  });

  const attributes: IAttribute[] = [];
  let hashIndex = 0;

  // Generate HAT
  if (shouldIncludeAttribute(hash, hashIndex++, CONFIG.hat.probability)) {
    const hatVariant = selectRandom(
      hash,
      hashIndex++,
      CONFIG.hat.variants
    ) as keyof typeof hatNames;
    const hatColor = selectRandom(
      hash,
      hashIndex++,
      CONFIG.hat.colors
    ) as keyof typeof colorNames;

    params.append("hat", hatVariant);
    params.append("hatColor", hatColor);
    params.append("hatProbability", "100");

    attributes.push({
      trait_type: "Hat",
      value: hatNames[hatVariant],
      color: colorNames[hatColor],
    });
  }

  // Generate Glasses
  if (shouldIncludeAttribute(hash, hashIndex++, CONFIG.glasses.probability)) {
    const glassesMode = selectRandom(hash, hashIndex++, CONFIG.glasses.modes);
    const glassesVariant = selectRandom(
      hash,
      hashIndex++,
      CONFIG.glasses.variants
    ) as keyof typeof glassesNames;
    const glassesColor = selectRandom(
      hash,
      hashIndex++,
      CONFIG.glasses.colors
    ) as keyof typeof glassesColorNames;

    params.append("glasses", `${glassesMode}${glassesVariant}`);
    params.append("glassesColor", glassesColor);
    params.append("glassesProbability", "100");

    attributes.push({
      trait_type: "Glasses",
      value: glassesNames[glassesVariant],
      color: glassesColorNames[glassesColor],
      mode: glassesMode.charAt(0).toUpperCase() + glassesMode.slice(1),
    });
  }

  // Generate Accesories
  if (
    shouldIncludeAttribute(hash, hashIndex++, CONFIG.accessories.probability)
  ) {
    const accessoryVariant = selectRandom(
      hash,
      hashIndex++,
      CONFIG.accessories.variants
    ) as keyof typeof accessoryNames;
    const accessoryColor = selectRandom(
      hash,
      hashIndex++,
      CONFIG.accessories.colors
    ) as keyof typeof accessoryColorNames;

    params.append("accessories", accessoryVariant);
    params.append("accessoriesColor", accessoryColor);
    params.append("accessoriesProbability", "100");

    attributes.push({
      trait_type: "Accessory",
      value: accessoryNames[accessoryVariant],
      color: accessoryColorNames[accessoryColor],
    });
  }

  // Generate Beard
  if (shouldIncludeAttribute(hash, hashIndex++, CONFIG.beard.probability)) {
    const beardVariant = selectRandom(
      hash,
      hashIndex++,
      CONFIG.beard.variants
    ) as keyof typeof beardNames;

    params.append("beard", beardVariant);
    params.append("beardProbability", "100");

    attributes.push({
      trait_type: "Beard",
      value: beardNames[beardVariant],
    });
  }

  // Add various background colors and clothing
  params.append(
    "clothingColor",
    "aec6cf,ffb347,ff6961,77dd77,fdfd96,cfcfc4,b39eb5,ffd1dc,cb99c9,e0bbe4"
  );

  const rarity = calculateRarity(attributes);
  const rarityTier = getRarityTier(rarity);
  const result = generatePXLPrice(attributes);
  params.append("backgroundColor", rarityTier.backgroundColor);

  const avatarUrl = `${DICE_BEAR_API}?${params.toString()}`;

  return {
    url: avatarUrl,
    attributes,
    rarity_score: rarity,
    rarity_tier: rarityTier.name,
    price: result.price,
    bonuses: result.bonuses,
  };
}

type PremiumColorKey = keyof typeof COLORS_VALUE;

// Generate price of PXL ART
function generatePXLPrice(attributes: IAttribute[], basePrice = 0.01) {
  const rarity = calculateRarity(attributes);

  const rarityMultiplier = Math.max(1, rarity / 100);
  let price = basePrice * rarityMultiplier;
  const bonuses: string[] = [];

  // BONUS: Premium Colors (view PREMIUM_COLORS const)
  attributes.forEach((attr) => {
    if (!attr.color) return;

    const hex = getColorHex(attr.color as PremiumColorKey);
    if (!hex) return;

    const bonusInfo = PREMIUM_COLORS[hex];
    if (bonusInfo) {
      price += bonusInfo.bonus;
      bonuses.push(`${bonusInfo.name} Item`);
    }
  });

  // BONUS: Special Combos (view SPECIAL_COMBOS const)
  Object.values(SPECIAL_COMBOS).forEach((combo) => {
    if (combo.check(attributes)) {
      price += combo.bonus;
      bonuses.push(combo.name);
    }
  });

  return {
    price: Math.round(price * 10000) / 10000,
    bonuses,
  };
}

// Function to calculate rarity based on probabilities
function calculateRarity(attributes: IAttribute[]) {
  let rarityScore = 100;

  let visualAttributes = 0;
  let goldItems = 0;

  // Base points for having attributes
  attributes.forEach((attr) => {
    switch (attr.trait_type) {
      case "Hat":
        rarityScore += 100 - CONFIG.hat.probability; // +60
        visualAttributes++;
        break;
      case "Glasses":
        rarityScore += 100 - CONFIG.glasses.probability; // +70
        visualAttributes++;
        break;
      case "Accessory":
        rarityScore += 100 - CONFIG.accessories.probability; // +55
        visualAttributes++;
        break;
      case "Beard":
        rarityScore += 100 - CONFIG.beard.probability; // +65
        visualAttributes++;
        break;
    }

    if (attr.color === "Gold") {
      goldItems++;
    }
  });

  // Bonus scores
  if (goldItems >= 2 && visualAttributes > 2) rarityScore += 150;
  else if (goldItems >= 1 && visualAttributes > 2) rarityScore += 50;
  else if (visualAttributes >= 4) rarityScore += 30;

  return Math.round(rarityScore);
}

export function generateNFTMetadata({
  tokenId,
  image,
  address,
  rarity_score,
  rarity_tier,
  attributes,
  bonuses,
}: {
  tokenId: number;
  image: string;
  address: string;
  rarity_score: number;
  rarity_tier: string;
  attributes: { trait_type: string; value: string | number }[];
  bonuses: string[];
}) {
  return {
    name: `PXL ART #${tokenId}`,
    description:
      "Generated PXL ART on-chain. Own your unique pixel art avatar!",
    image,
    attributes: [
      ...attributes,
      { trait_type: "Rarity Score", value: rarity_score },
      { trait_type: "Rarity Tier", value: rarity_tier },
      ...bonuses.map((b) => ({ trait_type: "Bonus", value: b })),
      { trait_type: "Minted At", display_type: "date", value: Date.now() },
    ],
    properties: {
      tokenId,
      generated_from: address,
    },
  };
}
