import useMarketplace from "@/hooks/useMarketplace";
import useStatistics from "@/hooks/useStatistics";

export default function Statics() {
  const { marketplaceItems, error } = useMarketplace();

  const { totalItems, totalOwners, totalVolume, lastMintedTimeAgo } =
    useStatistics({ items: marketplaceItems });

  return (
    <section className="flex lg:items-center gap-2 lg:gap-0 justify-between mb-4 flex-col lg:flex-row">
      <div className="flex items-center lg:gap-x-12 gap-x-2 justify-between lg:justify-normal">
        <div className="flex items-center gap-x-2">
          <h2 className="font-display lg:text-lg">Results</h2>
          <p className="text-text-secondary text-sm lg:text-base">
            {error ? 0 : totalItems}
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display lg:text-lg">Volume</h2>
          <p className="text-text-secondary text-sm lg:text-base">
            {error ? 0 : totalVolume} TBNB
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display lg:text-lg">Owners</h2>
          <p className="text-text-secondary text-sm lg:text-base">
            {error ? 0 : totalOwners}
          </p>
        </div>
      </div>
      <p className="text-accent-firthy font-display text-sm lg:text-base">
        last minted {lastMintedTimeAgo}
      </p>
    </section>
  );
}
