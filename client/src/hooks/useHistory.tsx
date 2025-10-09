import type { IPxl } from "@/interfaces/pxl";
import { ethers } from "ethers";

interface Props {
  item: IPxl;
}

export default function useHistory({ item }: Props) {
  const hasValidBuyer =
    ethers.isAddress(item.buyer) && item.buyer !== ethers.ZeroAddress;

  const hasValidBoughtAt = BigInt(item.boughtAt ?? 0n) !== 0n;

  const hasPreviousListings =
    Array.isArray(item.previousListings) && item.previousListings.length > 0;

  const lastSale =
    hasValidBuyer && hasValidBoughtAt
      ? { price: item.price, buyer: item.buyer, boughtAt: item.boughtAt }
      : hasPreviousListings
      ? item.previousListings?.[item.previousListings.length - 1] ?? null
      : null;

  const hasActivity =
    (hasValidBuyer && hasValidBoughtAt) || hasPreviousListings;

  return {
    lastSale,
    hasActivity,
    hasValidBuyer,
    hasValidBoughtAt,
    hasPreviousListings,
  };
}
