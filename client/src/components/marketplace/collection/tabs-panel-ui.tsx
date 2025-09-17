import { TabPanel, TabPanels } from "@headlessui/react";
import PxlList from "../../widgets/pxl-list";

export default function TabsPanelUI() {
  return (
    <div>
      <div className="flex items-center gap-x-6 mb-4">
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Items</h2>
          <p className="text-text-secondary">4</p>
        </div>
        <div className="flex items-center gap-x-2">
          <h2 className="font-display text-lg">Vol</h2>
          <p className="text-text-secondary">2.4 TBNB</p>
        </div>
      </div>
      <TabPanels>
        <TabPanel>
          <PxlList />
        </TabPanel>
        <TabPanel>
          <PxlList />
        </TabPanel>
      </TabPanels>
    </div>
  );
}
