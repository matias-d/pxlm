import type { IPxl } from "@/interfaces/pxl";

export function processNFTGroups(nfts: IPxl[]): IPxl[] {
  const groupedByToken = nfts.reduce((acc, nft) => {
    if (!acc[nft.tokenId]) acc[nft.tokenId] = [];
    acc[nft.tokenId].push(nft);
    return acc;
  }, {} as Record<number, IPxl[]>);

  const processed: IPxl[] = [];

  for (const tokenId in groupedByToken) {
    const group = groupedByToken[tokenId].sort((a, b) => {
      const timeA = Number(a.boughtAt ?? a.minted_at);
      const timeB = Number(b.boughtAt ?? b.minted_at);
      return timeA - timeB;
    });

    const current = group[group.length - 1];

    if (group.length > 1) {
      current.previousListings = group
        .slice(0, -1)
        .map((prev) => ({
          price: prev.price,
          seller: prev.seller,
          sold: prev.sold,
          itemId: prev.itemId,
          buyer: prev.buyer,
          boughtAt: prev.boughtAt,
        }))
        .reverse();
    }

    processed.push(current);
  }

  return processed;
}
