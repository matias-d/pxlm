import { TabPanel, TabPanels } from "@headlessui/react";
import useMarketplace from "@/hooks/useMarketplace";
import PxlList from "../../widgets/pxl-list";
import Loading from "../../ui/loading";

export default function TabsPanelUI() {
  const { error, loading, items } = useMarketplace();

  return (
    <div>
      <div className="flex items-center gap-x-6 mb-4">
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Items</h2>
          <p className="text-text-secondary">{error ? 0 : 4}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Vol</h2>
          <p className="text-text-secondary">{error ? 0 : "2.5k TBNB"}</p>
        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <PxlList
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
            loading={loading}
            error={error}
            items={items}
          />
        </TabPanel>
        <TabPanel>
          <PxlList
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
            loading={loading}
            error={error}
            items={items}
          />
        </TabPanel>
      </TabPanels>
    </div>
  );
}
