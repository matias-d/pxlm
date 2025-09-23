import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import TabsPanelUI from "./tabs-panel-ui";
import { cn } from "@/lib/cn";
import useMarketplace from "@/hooks/useMarketplace";

const tabs: {
  id: number;
  label: string;
  value: "all" | "sold" | "purchase";
}[] = [
  {
    id: 1,
    label: "All",
    value: "all",
  },
  {
    id: 2,
    label: "Sold",
    value: "sold",
  },
  {
    id: 3,
    label: "Purchase",
    value: "purchase",
  },
];
export default function Tabs() {
  const { onFilterByStatusUserItems } = useMarketplace();

  return (
    <TabGroup className="w-full flex flex-col items-center justify-center gap-x-4">
      <TabList className="flex items-center gap-x-12 font-display font-semibold">
        {tabs.map((tab) => (
          <Tab as={Fragment} key={tab.id}>
            {({ selected }) => (
              <div className="relative outline-none">
                <button
                  onClick={() => onFilterByStatusUserItems(tab.value)}
                  className={cn(
                    " text-text-secondary outline-none cursor-pointer",
                    selected && "text-text-primary"
                  )}
                >
                  {tab.label}
                </button>
                <div
                  className={cn(
                    "data-selected:block w-12 h-[2px] bg-accent absolute left-1/2 -translate-x-1/2 -bottom-4.5 opacity-0 transition-opacity ease-in-out duration-200",
                    selected && "opacity-100"
                  )}
                ></div>
              </div>
            )}
          </Tab>
        ))}
      </TabList>
      <hr className="w-full border-[0.5px] border-border my-4" />
      <TabsPanelUI />
    </TabGroup>
  );
}
