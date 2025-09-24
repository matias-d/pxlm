import type { IPxl } from "@/interfaces/pxl";

export function applyPriceOrder(
  items: IPxl[],
  order: "low-to-high" | "high-to-low"
): IPxl[] {
  const rarityRank: Record<string, number> = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
  };

  return [...items].sort((a, b) => {
    const priceA = parseFloat(a.price);
    const priceB = parseFloat(b.price);

    if (priceA === priceB) {
      const rarityA = rarityRank[a.rarity_tier.toLowerCase()] ?? 0;
      const rarityB = rarityRank[b.rarity_tier.toLowerCase()] ?? 0;
      return rarityB - rarityA;
    }

    return order === "low-to-high" ? priceA - priceB : priceB - priceA;
  });
}

export function filterSoldItems(items: IPxl[], userAddress: string): IPxl[] {
  return items.filter(
    (item) =>
      item.sold === true &&
      item.seller.toLowerCase() === userAddress.toLowerCase()
  );
}

export function filterPurchasedItems(
  items: IPxl[],
  userAddress: string
): IPxl[] {
  return items.filter(
    (item) =>
      item.sold === true &&
      item.seller.toLowerCase() !== userAddress.toLowerCase()
  );
}
