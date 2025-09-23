import { useMemo } from "react";
import type { IPxl } from "@/interfaces/pxl";
import { getTimeAgo } from "@/utils/get-time-ago";

interface Props {
  items: IPxl[];
}

interface Statistics {
  totalItems: number;
  availableItems: number;
  soldItems: number;

  totalVolume: string;
  averagePrice: string;
  floorPrice: string;
  ceilingPrice: string;

  totalOwners: number;
  uniqueSellers: string[];

  lastMinted: IPxl | null;
  lastMintedDate: Date | null;
  lastMintedTimeAgo: string;

  salesRate: number;
  volumeByRarity: Record<string, { volume: string; count: number }>;
}

export default function useStatistics({ items }: Props): Statistics {
  return useMemo(() => {
    if (!items || items.length === 0) {
      return {
        totalItems: 0,
        availableItems: 0,
        soldItems: 0,
        totalVolume: "0",
        averagePrice: "0",
        floorPrice: "0",
        ceilingPrice: "0",
        totalOwners: 0,
        uniqueSellers: [],
        lastMinted: null,
        lastMintedDate: null,
        lastMintedTimeAgo: "never",
        salesRate: 0,
        volumeByRarity: {},
      };
    }

    // 1. Cantidad de items
    const totalItems = items.length;
    const soldItems = items.filter((item) => item.sold).length;
    const availableItems = totalItems - soldItems;

    // 2. Cálculos de volumen
    const prices = items.map((item) => parseFloat(item.price));
    const totalVolume = prices.reduce((sum, price) => sum + price, 0);
    const averagePrice = totalVolume / totalItems;
    const floorPrice = Math.min(...prices);
    const ceilingPrice = Math.max(...prices);

    // 3. Owners únicos
    const uniqueSellers = [...new Set(items.map((item) => item.seller))];
    const totalOwners = uniqueSellers.length;

    // 4. Último minteado (NFT con minted_at más reciente)
    const sortedByMintDate = [...items].sort(
      (a, b) => b.minted_at - a.minted_at
    );
    const lastMinted = sortedByMintDate[0] || null;
    const lastMintedDate = lastMinted ? new Date(lastMinted.minted_at) : null;
    const lastMintedTimeAgo = lastMinted
      ? getTimeAgo(lastMinted.minted_at)
      : "never";

    // 5. Estadísticas adicionales
    const salesRate = totalItems > 0 ? (soldItems / totalItems) * 100 : 0;

    // 6. Volumen por rareza
    const volumeByRarity = items.reduce((acc, item) => {
      const rarity = item.rarity_tier;
      const price = parseFloat(item.price);

      if (!acc[rarity]) {
        acc[rarity] = { volume: "0", count: 0 };
      }

      acc[rarity].volume = (parseFloat(acc[rarity].volume) + price).toString();
      acc[rarity].count += 1;

      return acc;
    }, {} as Record<string, { volume: string; count: number }>);

    return {
      totalItems,
      availableItems,
      soldItems,
      totalVolume: totalVolume.toFixed(4),
      averagePrice: averagePrice.toFixed(4),
      floorPrice: floorPrice.toFixed(4),
      ceilingPrice: ceilingPrice.toFixed(4),
      totalOwners,
      uniqueSellers,
      lastMinted,
      lastMintedDate,
      lastMintedTimeAgo,
      salesRate: Math.round(salesRate * 100) / 100, // 2 decimales
      volumeByRarity: Object.fromEntries(
        Object.entries(volumeByRarity).map(([rarity, data]) => [
          rarity,
          {
            ...data,
            volume: parseFloat(data.volume).toFixed(4),
          },
        ])
      ),
    };
  }, [items]);
}
