import type { IPxl, IPxlContract, PinataPXLResponse } from "@/interfaces/pxl";

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
