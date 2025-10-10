import CreateCallToAction from "@/components/marketplace/home/create-call-to-action";
import FiltersUI from "@/components/marketplace/home/filters-ui";
import Statics from "@/components/marketplace/home/statics";
import LoadingTop from "@/components/ui/loading-top";
import useMarketplace from "@/hooks/useMarketplace";
import NotItems from "@/components/ui/not-items";
import PxlList from "@/components/ui/pxl-list";
import Loading from "@/components/ui/loading";
import Button from "@/components/ui/button";
import { useTitle } from "@/hooks/useTitle";
import useLayout from "@/hooks/useLayout";
import { Link } from "react-router";

export default function Home() {
  useTitle("Marketplace - PXLM");

  const { loading, error, marketplaceItems } = useMarketplace();
  const { layout, onLayout } = useLayout({ name: "marketplace-layout" });

  return (
    <section className="pb-12">
      <LoadingTop loading={loading} />

      <CreateCallToAction />

      <Statics />
      <FiltersUI layout={layout} onLayout={onLayout} />

      <PxlList
        error={error}
        layout={layout}
        loading={loading}
        items={marketplaceItems}
        renderLoading={() => (
          <Loading src="/assets/art-loading.svg" label="Obtaining collection" />
        )}
        renderNotItems={() => (
          <NotItems message="No items available in the marketplace right now.">
            <Button className="h-4 text-xs px-4" asChild>
              <Link to="/marketplace/create">Create your PXL</Link>
            </Button>
          </NotItems>
        )}
      />
    </section>
  );
}
