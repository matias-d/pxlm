import useMarketplace from "@/hooks/useMarketplace";
import useStatistics from "@/hooks/useStatistics";

export default function Statics() {
  const { marketplaceItems, error } = useMarketplace();

  const { totalItems, totalOwners, totalVolume, lastMintedTimeAgo } =
    useStatistics({ items: marketplaceItems });

  return (
    <section className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-x-12">
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Results</h2>
          <p className="text-text-secondary">{error ? 0 : totalItems}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Volume</h2>
          <p className="text-text-secondary">{error ? 0 : totalVolume} TBNB</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Owners</h2>
          <p className="text-text-secondary">{error ? 0 : totalOwners}</p>
        </div>
      </div>
      <p className="text-accent-firthy font-display ">
        last minted {lastMintedTimeAgo}
      </p>
    </section>
  );
}
