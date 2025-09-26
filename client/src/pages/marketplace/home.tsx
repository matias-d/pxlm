import CreateCallToAction from "@/components/marketplace/home/create-call-to-action";
import FiltersUI from "@/components/marketplace/home/filters-ui";
import Statics from "@/components/marketplace/home/statics";
import LoadingTop from "@/components/ui/loading-top";
import useMarketplace from "@/hooks/useMarketplace";
import PxlList from "@/components/widgets/pxl-list";
import NotItems from "@/components/ui/not-items";
import Loading from "@/components/ui/loading";
import Button from "@/components/ui/button";
import PxlDetails from "@/components/ui/pxl-detail";

export default function Home() {
  const { loading, error, items } = useMarketplace();

  return (
    <>
      <PxlDetails />
      <section className="pb-12">
        <LoadingTop loading={loading} />

        <CreateCallToAction />
        {/* <PXLDetail /> */}

        <Statics />
        <FiltersUI />
        <PxlList
          renderLoading={() => (
            <Loading
              src="/assets/art-loading.svg"
              label="Obtaining collection"
            />
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
    </>
  );
}
