import useMarketplace from "@/hooks/useMarketplace";
import useStatistics from "@/hooks/useStatistics";

export default function Statics() {
  const { userItems, error } = useMarketplace();
  const { totalVolume, totalItems } = useStatistics({ items: userItems });

  return (
    <section className="flex items-center gap-x-6 mb-4  w-full">
      <div className="flex items-center gap-x-2">
        <h2 className="font-display text-lg">Items</h2>
        <p className="text-text-secondary">{error ? 0 : totalItems}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <h2 className="font-display text-lg">Vol</h2>
        <p className="text-text-secondary">{error ? 0 : totalVolume} TBNB</p>
      </div>
    </section>
  );
}
