import {
  accessoryNames,
  beardNames,
  CONFIG,
  glassesNames,
  hatNames,
  RARITY_SYSTEM,
  SPECIAL_COMBOS,
} from "./pxl-config";

export const rarities = [
  {
    id: 1,
    image: "/guide/pxl-legendary.svg",
    score: RARITY_SYSTEM.LEGENDARY.minScore,
  },
  {
    id: 2,
    image: "/guide/pxl-epic.svg",
    score: RARITY_SYSTEM.EPIC.minScore,
  },
  {
    id: 3,
    image: "/guide/pxl-rare.svg",
    score: RARITY_SYSTEM.RARE.minScore,
  },

  {
    id: 4,
    image: "/guide/pxl-common.svg",
    score: RARITY_SYSTEM.COMMON.minScore,
  },
];

export const combos = [
  {
    id: "golden-set-combo",
    image: "/pxl-examples/set_golden.svg",
    combo: SPECIAL_COMBOS.GOLDEN_SET.name,
    bonus: SPECIAL_COMBOS.GOLDEN_SET.bonus,
    icon: "/guide/golden_set.png",
  },
  {
    id: "silver-set-combo",
    image: "/pxl-examples/set_silver.svg",
    combo: SPECIAL_COMBOS.SILVER_SET.name,
    bonus: SPECIAL_COMBOS.SILVER_SET.bonus,
    icon: "/guide/silver_set.png",
  },
  {
    id: "gentleman-combo",
    image: "/pxl-examples/gentleman.svg",
    combo: "Gentleman",
    bonus: SPECIAL_COMBOS.GENTLEMAN.bonus,
    desc: "(top hat, glasses and beard)",
    icon: "/guide/gentleman.png",
  },
];

export const attributes = [
  {
    type: "Hat",
    variants: Object.values(hatNames),
    probability: `${CONFIG.hat.probability}%`,
  },
  {
    type: "Glasses",
    variants: Object.values(glassesNames),
    probability: `${CONFIG.glasses.probability}%`,
  },
  {
    type: "Accessories",
    variants: Object.values(accessoryNames),
    probability: `${CONFIG.accessories.probability}%`,
  },
  {
    type: "Beard",
    variants: Object.values(beardNames),
    probability: `${CONFIG.beard.probability}%`,
  },
];
