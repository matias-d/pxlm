import type {
  IPxl,
  IPxlContract,
  PinataPXLResponse,
  RawListing,
} from "@/interfaces/pxl";
import { ethers } from "ethers";

interface NFTMapperParams {
  item: IPxlContract;
  metadata: PinataPXLResponse;
  price: string;
  owner: string;
}

export function NFTMapper({
  item,
  metadata,
  price,
  owner,
}: NFTMapperParams): IPxl {
  const image = `https://${import.meta.env.VITE_GATEWAY}/${metadata.image}`;
  const rarity_score =
    Number(
      metadata.attributes.find((attr) => attr.trait_type === "Rarity Score")
        ?.value
    ) || 0;
  const rarity_tier =
    String(
      metadata.attributes.find((attr) => attr.trait_type === "Rarity Tier")
        ?.value
    ) || "";

  const minted_at = Number(
    metadata.attributes.find((attr) => attr.trait_type === "Minted At")?.value
  );

  const previousListings = formatListinings(item.history);

  const nft: IPxl = {
    generatedFrom: metadata.properties.generated_from,
    description: metadata.description,
    attributes: metadata.attributes,
    tokenId: Number(item.tokenId),
    itemId: Number(item.itemId),
    boughtAt: item.boughtAt,
    nftAddress: item.nft,
    seller: item.seller,
    name: metadata.name,
    buyer: item.buyer,
    previousListings,
    sold: item.sold,
    rarity_score,
    rarity_tier,
    minted_at,
    price,
    image,
    owner,
  };

  return nft;
}

function formatListinings(itemHistory: RawListing[]) {
  const formatted = itemHistory
    .map((listing) => {
      const price = ethers.formatEther(listing[3]);
      const isListing =
        listing[2] === ethers.ZeroAddress && listing[5] === false;
      const type: "listing" | "sale" = isListing ? "listing" : "sale";

      return {
        itemId: Number(listing[0]),
        price,
        seller: listing[1],
        buyer: listing[2],
        boughtAt: Number(listing[4]),
        sold: listing[5],
        type,
      };
    })
    .sort((a, b) => {
      const boughtA = a.boughtAt === 0 ? Number.MAX_SAFE_INTEGER : a.boughtAt;
      const boughtB = b.boughtAt === 0 ? Number.MAX_SAFE_INTEGER : b.boughtAt;
      return boughtB - boughtA;
    });

  return formatted;
}
