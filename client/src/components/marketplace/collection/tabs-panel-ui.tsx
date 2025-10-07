import { TabPanel, TabPanels } from "@headlessui/react";
import useMarketplace from "@/hooks/useMarketplace";
import NotItems from "@/components/ui/not-items";
import PxlList from "../../ui/pxl-list";
import Button from "@/components/ui/button";
import RelistItem from "./relist-item/relist-item";
import Loading from "../../ui/loading";
import { Link } from "react-router";
import { useEffect } from "react";
import Statics from "./statics";

export default function TabsPanelUI() {
  const { error, loading, getAllUserNfts, userItems, account } =
    useMarketplace();

  useEffect(() => {
    if (!account?.signer) return;
    (async () => {
      await getAllUserNfts();
    })();
  }, [account?.signer]);

  const load = loading || (!account?.signer && !error);

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
                  <Button className="h-4 text-xs px-4" asChild>
                    <Link to="/marketplace">Marketplace</Link>
                  </Button>
                  <Button className="h-4 text-xs px-4 btn-secondary" asChild>
                    <Link to="/marketplace/create">Create</Link>
                  </Button>
                </div>
              </NotItems>
            )}
            loading={load}
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
            loading={load}
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
                <Button className="h-4 text-xs px-4" asChild>
                  <Link to="/marketplace">Marketplace</Link>
                </Button>
              </NotItems>
            )}
            loading={load}
            error={error}
            items={userItems}
          />
        </TabPanel>

        {/* Relist items again in Marketplace */}
        <TabPanel>
          <RelistItem items={userItems} loading={load} />
        </TabPanel>
      </TabPanels>
    </div>
  );
}
