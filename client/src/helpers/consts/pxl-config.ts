export const CONFIG = {
  hat: {
    variants: ["variant02", "variant09", "variant06", "variant10"],
    colors: ["d11141", "00b159", "428bca", "c0c0c0", "ffd700", "ff69b4"],
    probability: 70,
  },
  glasses: {
    variants: ["01", "07", "04", "06"],
    colors: ["722f37", "000000", "ffd700", "808080", "4169e1"],
    modes: ["dark", "light"],
    probability: 60,
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
  "722f37": "Burgundy",
  "000000": "Black",
  ffd700: "Gold",
  "808080": "Gray",
  "4169e1": "Blue",
};

// Accessory

export const accessoryNames = {
  variant01: "Large Ear Piercing",
  variant04: "Small Ear Piercing",
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
