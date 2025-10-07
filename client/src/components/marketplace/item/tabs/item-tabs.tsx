import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { IPxl } from "@/interfaces/pxl";
import ActivityTab from "./activity-tab";
import DetailsTab from "./details-tab";
import { cn } from "@/lib/cn";
const tabs: {
  id: number;
  label: string;
}[] = [
  {
    id: 1,
    label: "Details",
  },
  {
    id: 2,
    label: "Activity",
  },
];

interface Props {
  selected: IPxl;
}

export default function ItemTabs({ selected }: Props) {
  return (
    <TabGroup>
      <TabList className="flex items-center gap-x-8 ">
        {tabs.map((tab) => (
          <Tab
            className="text-sm font-semibold font-display cursor-pointer"
            key={tab.id}
          >
            {({ selected }) => (
              <div className="relative outline-none">
                <span
                  className={cn(
                    "block text-text-secondary hover:text-white transition-colors",
                    selected && "text-white"
                  )}
                >
                  {tab.label}
                </span>
                <div
                  className={cn(
                    "data-selected:block w-12 h-[2px] bg-white absolute left-1/2 -translate-x-1/2 -bottom-4.5 opacity-0 transition-opacity ease-in-out duration-200",
                    selected && "opacity-100"
                  )}
                ></div>
              </div>
            )}
          </Tab>
        ))}
      </TabList>
      <div className="h-[1px] w-full bg-border my-4" />
      <TabPanels>
        <TabPanel>
          <DetailsTab selected={selected} />
        </TabPanel>
        <TabPanel>
          <ActivityTab selected={selected} />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
