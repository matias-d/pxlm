import CreateCallToAction from "../../components/marketplace/home/create-call-to-action";
import FiltersUI from "../../components/marketplace/home/filters-ui";
import PxlList from "../../components/widgets/pxl-list";

export default function Home() {
  return (
    <section>
      <CreateCallToAction />

      <section className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-12">
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Results</h2>
            <p className="text-text-secondary">1000</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Volume</h2>
            <p className="text-text-secondary">2.5k TBNB</p>
          </div>
          <div className="flex items-center gap-x-2">
            <h2 className="font-display text-lg">Owners</h2>
            <p className="text-text-secondary">200</p>
          </div>
        </div>
        <p className="text-accent-firthy font-display ">
          last minted 30 mins ago
        </p>
      </section>

      <FiltersUI />
      <PxlList />
    </section>
  );
}
