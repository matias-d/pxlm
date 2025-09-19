import CreateCallToAction from "@/components/marketplace/home/create-call-to-action";
import FiltersUI from "@/components/marketplace/home/filters-ui";
import PxlList from "@/components/widgets/pxl-list";
import Loading from "@/components/ui/loading";

export default function Home() {
  const error = false;
  const loading = false;

  return (
    <section className="pb-12">
      <CreateCallToAction />

      <section className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Results</h2>
            <p className="text-text-secondary">{error ? 0 : 1000}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Volume</h2>
            <p className="text-text-secondary">{error ? 0 : "2.5k TBNB"}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Owners</h2>
            <p className="text-text-secondary">{error ? 0 : 200}</p>
          </div>
        </div>
        <p className="text-accent-firthy font-display ">
          last minted 30 mins ago
        </p>
      </section>

      <FiltersUI />
      <PxlList
        error={error}
        items={[1, 2, 3, 4]}
        loading={loading}
        renderLoading={() => (
          <Loading src="/pxl-examples/9.svg" label="Obtaining collection" />
        )}
      />
    </section>
  );
}
