import CreateCallToAction from "@/components/marketplace/home/create-call-to-action";
import FiltersUI from "@/components/marketplace/home/filters-ui";
import useMarketplace from "@/hooks/useMarketplace";
import PxlList from "@/components/widgets/pxl-list";
import useStatistics from "@/hooks/useStatistics";
import NotItems from "@/components/ui/not-items";
import Loading from "@/components/ui/loading";
import Button from "@/components/ui/button";

export default function Home() {
  const { loading, error, items } = useMarketplace();

  const { totalItems, totalOwners, totalVolume, lastMintedTimeAgo } =
    useStatistics({ items });

  return (
    <section className="pb-12">
      <CreateCallToAction />
      {/* <PXLDetail /> */}
      <section className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Results</h2>
            <p className="text-text-secondary">{error ? 0 : totalItems}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Volume</h2>
            <p className="text-text-secondary">
              {error ? 0 : totalVolume} TBNB
            </p>
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

      <FiltersUI />
      <PxlList
        renderLoading={() => (
          <Loading src="/pxl-examples/9.svg" label="Obtaining collection" />
        )}
        renderNotItems={() => (
          <NotItems message="No items available in the marketplace right now.">
            <Button className="h-4 text-xs px-4">Create your PXL</Button>
          </NotItems>
        )}
        loading={loading}
        error={error}
        items={items}
      />
    </section>
  );
}
