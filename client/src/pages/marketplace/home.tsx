import CreateCallToAction from "@/components/marketplace/home/create-call-to-action";
import FiltersUI from "@/components/marketplace/home/filters-ui";
import Statics from "@/components/marketplace/home/statics";
import useMarketplace from "@/hooks/useMarketplace";
import PxlList from "@/components/widgets/pxl-list";
import NotItems from "@/components/ui/not-items";
import Loading from "@/components/ui/loading";
import Button from "@/components/ui/button";

export default function Home() {
  const { loading, error, items } = useMarketplace();

  return (
    <section className="pb-12">
      <CreateCallToAction />
      {/* <PXLDetail /> */}

      <Statics />
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
