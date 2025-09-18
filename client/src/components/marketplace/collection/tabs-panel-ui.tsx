import { TabPanel, TabPanels } from "@headlessui/react";
import PxlList from "../../widgets/pxl-list";
import Loading from "../../ui/loading";

export default function TabsPanelUI() {
  const error = false;
  const loading = false;

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
            error={error}
            items={[1, 2, 3, 4]}
            loading={loading}
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
          />
        </TabPanel>
        <TabPanel>
          <PxlList
            error={error}
            items={[1, 2, 3, 4]}
            loading={loading}
            renderLoading={() => (
              <Loading label="Obtaining collection" withIcon />
            )}
          />
        </TabPanel>
      </TabPanels>
    </div>
  );
}
