import {
  accessoryColorNames,
  accessoryNames,
  beardNames,
  colorNames,
  CONFIG,
  glassesColorNames,
  glassesNames,
  hatNames,
} from "@/helpers/consts/pxl-config";

import {
  createDeterministicHash,
  selectRandom,
  shouldIncludeAttribute,
} from "@/helpers/functions/pxl-posibilities";
import type { IAttributes } from "@/interfaces/attributes";

const DICE_BEAR_API = "https://api.dicebear.com/9.x/pixel-art/svg";

export function generatePXL({ address }: { address: string }) {
  const timestamp = Date.now();
  const hash = createDeterministicHash(address, timestamp);
  const seed = address.slice(-8) + timestamp.toString().slice(-4);

  const params = new URLSearchParams({
    seed: seed,
  });

  const attributes: IAttributes[] = [];
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
  params.append("backgroundColor", "c0aede,ffdfbf,b6e3f4");
  params.append(
    "clothingColor",
    "428bca,44c585,5bc0de,88d8b0,ae0001,d11141,ff6f69,ffc425,ffd969,ffeead,03396c,00b159"
  );

  const avatarUrl = `${DICE_BEAR_API}?${params.toString()}`;

  const rarity = calculateRarity(attributes);

  return {
    url: avatarUrl,
    attributes,
    timestamp,
    rarity,
  };
}

// Function to calculate rarity based on probabilities
export function calculateRarity(attributes: IAttributes[]) {
  let rarityScore = 100;

  attributes.forEach((attr) => {
    switch (attr.trait_type) {
      case "Hat":
        rarityScore += 100 - CONFIG.hat.probability;
        break;
      case "Glasses":
        rarityScore += 100 - CONFIG.glasses.probability;
        break;
      case "Accessory":
        rarityScore += 100 - CONFIG.accessories.probability;
        break;
      case "Beard":
        rarityScore += 100 - CONFIG.beard.probability;
        break;
    }
  });

  return Math.round(rarityScore);
}
