import { TabPanel, TabPanels } from "@headlessui/react";
import useMarketplace from "@/hooks/useMarketplace";
import NotItems from "@/components/ui/not-items";
import PxlList from "../../widgets/pxl-list";
import Button from "@/components/ui/button";
import Loading from "../../ui/loading";
import { useEffect } from "react";
import useStatistics from "@/hooks/useStatistics";

export default function TabsPanelUI() {
  const { error, loading, getAllUserNfts, userItems } = useMarketplace();

  console.log("Useritems", userItems);

  const { totalVolume, totalItems } = useStatistics({ items: userItems });

  useEffect(() => {
    (async () => await getAllUserNfts())();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center gap-x-6 mb-4  w-full">
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Items</h2>
          <p className="text-text-secondary">{error ? 0 : totalItems}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Vol</h2>
          <p className="text-text-secondary">{error ? 0 : totalVolume} TBNB</p>
        </div>
      </div>
      <TabPanels>
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
