import type { IPxl, PreviousListings } from "@/interfaces/pxl";

export interface ProcessedNFT {
  tokenId: number;
  current: IPxl;
  previous: IPxl | null;
  history: IPxl[];
}

function processNFTGroups(items: IPxl[]): ProcessedNFT[] {
  if (!items?.length) return [];

  const grouped = items.reduce((acc, item) => {
    if (!acc[item.tokenId]) acc[item.tokenId] = [];
    acc[item.tokenId].push(item);
    return acc;
  }, {} as Record<number, IPxl[]>);

  const processed: ProcessedNFT[] = Object.entries(grouped).map(
    ([tokenId, group]) => {
      group.sort((a, b) => {
        const timeA = Number(
          BigInt(a.boughtAt) !== 0n ? a.boughtAt : a.minted_at
        );
        const timeB = Number(
          BigInt(b.boughtAt) !== 0n ? b.boughtAt : b.minted_at
        );
        return timeA - timeB;
      });

      const current = group[group.length - 1];

      const previous = group.length > 1 ? group[group.length - 2] : null;

      return {
        tokenId: Number(tokenId),
        current,
        previous,
        history: group,
      };
    }
  );

  return processed;
}

function formatProcessedNFTs(processed: ProcessedNFT[]): IPxl[] {
  return processed.map(({ current, history }) => {
    const previousListings: PreviousListings[] = history
      .slice(0, -1)
      .map((item) => ({
        price: item.price,
        seller: item.seller,
        sold: item.sold,
        itemId: item.itemId,
        buyer: item.buyer,
        boughtAt: Number(item.boughtAt ?? 0),
      }))
      .sort((a, b) => b.boughtAt - a.boughtAt);

    return {
      ...current,
      previousListings:
        previousListings.length > 0 ? previousListings : undefined,
    };
  });
}

export function processAndFormatNFTs(items: IPxl[]): IPxl[] {
  const proccessed = processNFTGroups(items);
  const formated = formatProcessedNFTs(proccessed);

  return formated;
}
