import type { IAttributes } from "@/interfaces/attributes";

export const CONFIG = {
  hat: {
    variants: ["variant02", "variant09", "variant06", "variant10"],
    colors: ["d11141", "00b159", "428bca", "c0c0c0", "ffd700", "ff69b4"],
    probability: 40,
  },
  glasses: {
    variants: ["01", "07", "04", "06"],
    colors: ["000000", "ffd700", "808080", "4169e1"],
    modes: ["dark", "light"],
    probability: 30,
  },
  accessories: {
    variants: ["variant01", "variant04"],
    colors: ["c0c0c0", "ffd700"],
    probability: 45,
  },
  beard: {
    variants: ["variant04", "variant06", "variant01"],
    probability: 35,
  },
};

// COLORS ACCESORIES
export const COLORS_VALUE_HEX = {
  Red: "#d11141",
  Green: "#00b159",
  Blue: "#428bca",
  Silver: "#c0c0c0",
  Gold: "#ffd700",
  Pink: "#ff69b4",
  Black: "#000000",
  Gray: "#808080",
};

export const COLORS_VALUE = {
  Red: "d11141",
  Green: "00b159",
  Blue: "428bca",
  Silver: "c0c0c0",
  Gold: "ffd700",
  Pink: "ff69b4",
  Black: "000000",
  Gray: "808080",
};

// Hat
export const hatNames = {
  variant02: "Cap",
  variant09: "Beanie",
  variant06: "Top Hat",
  variant10: "Bucket Hat",
};

export const colorNames = {
  d11141: "Red",
  "00b159": "Green",
  "428bca": "Blue",
  c0c0c0: "Silver",
  ffd700: "Gold",
  ff69b4: "Pink",
};

// Glasses
export const glassesNames = {
  "01": "Small Glasses",
  "07": "Round Glasses",
  "04": "Light Glasses",
  "06": "Large Glasses",
};

export const glassesColorNames = {
  "000000": "Black",
  ffd700: "Gold",
  "808080": "Gray",
  "4169e1": "Blue",
};

// Accessory
export const accessoryNames = {
  variant01: "Large Piercing",
  variant04: "Small Piercing",
};

export const accessoryColorNames = {
  c0c0c0: "Silver",
  ffd700: "Gold",
};

// Beard
export const beardNames = {
  variant04: "Goatee",
  variant06: "Full Beard",
  variant01: "Regular Beard",
};

// RARITY_SYSTEM
export const RARITY_SYSTEM = {
  LEGENDARY: {
    name: "legendary",
    minScore: 401,
    backgroundColor: "d4af37,b8860b",
  },
  EPIC: {
    name: "epic",
    minScore: 335,
    backgroundColor: "8e7cc3,6f5f8f",
  },
  RARE: {
    name: "rare",
    minScore: 260,
    backgroundColor: "1B7599",
  },
  UNCOMMON: {
    name: "uncommon",
    minScore: 190,
    backgroundColor: "c0aede",
  },
  COMMON: {
    name: "common",
    minScore: 100,
    backgroundColor: "c0aede",
  },
};
// === BONUS SYSTEM ===

export const SPECIAL_COMBOS = {
  GOLDEN_SET: {
    check: (attrs: IAttributes[]) =>
      attrs.filter((a) => a.value === "Gold").length >= 2,
    bonus: 0.008,
    name: "Golden Set",
  },
  SILVER_SET: {
    check: (attrs: IAttributes[]) =>
      attrs.filter((a) => a.value === "Silver").length >= 2,
    bonus: 0.008,
    name: "Silver Set",
  },
  FULL_ACCESSORY: {
    check: (attrs: IAttributes[]) =>
      ["Hat", "Glasses", "Accessory", "Beard"].every((type) =>
        attrs.some((a) => a.trait_type === type)
      ),
    bonus: 0.006,
    name: "Fully Loaded",
  },
  GENTLEMAN: {
    check: (attrs: IAttributes[]) =>
      attrs.some((a) => a.value === "Top Hat") &&
      attrs.some((a) => a.trait_type === "Glasses") &&
      attrs.some((a) => a.trait_type === "Beard"),
    bonus: 0.005,
    name: "Distinguished Gentleman",
  },
};

export const PREMIUM_COLORS: Record<string, { name: string; bonus: number }> = {
  ffd700: { name: "Gold", bonus: 0.004 },
  c0c0c0: { name: "Silver", bonus: 0.002 },
};
