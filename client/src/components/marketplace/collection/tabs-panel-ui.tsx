import { TabPanel, TabPanels } from "@headlessui/react";
import useMarketplace from "@/hooks/useMarketplace";
import NotItems from "@/components/ui/not-items";
import PxlList from "../../widgets/pxl-list";
import Button from "@/components/ui/button";
import Loading from "../../ui/loading";
import { useEffect } from "react";
import Statics from "./statics";

export default function TabsPanelUI() {
  const { error, loading, getAllUserNfts, userItems } = useMarketplace();

  useEffect(() => {
    (async () => await getAllUserNfts())();
  }, []);

  return (
    <div className="w-full">
      <Statics />
      <TabPanels>
        {/* Panel All items */}
        <TabPanel>
          <PxlList
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
            renderNotItems={() => (
              <NotItems message="You don’t own any PXLs yet. Create or buy to build your collection.">
                <div className="flex items-center gap-x-2">
                  <Button className="h-4 text-xs px-4">Marketplace</Button>
                  <Button className="h-4 text-xs px-4 btn-secondary">
                    Create
                  </Button>
                </div>
              </NotItems>
            )}
            loading={loading}
            error={error}
            items={userItems}
          />
        </TabPanel>

        {/* Panel Items Sold */}
        <TabPanel>
          <PxlList
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
            renderNotItems={() => (
              <NotItems message="You haven’t sold any PXLs yet. List your creations to start selling" />
            )}
            loading={loading}
            error={error}
            items={userItems}
          />
        </TabPanel>

        {/* Panel Items Purchased */}
        <TabPanel>
          <PxlList
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
            renderNotItems={() => (
              <NotItems message="You haven’t purchased any PXLs yet. Explore the marketplace and get your first one.">
                <Button className="h-4 text-xs px-4">Marketplace</Button>
              </NotItems>
            )}
            loading={loading}
            error={error}
            items={userItems}
          />
        </TabPanel>
      </TabPanels>
    </div>
  );
}
