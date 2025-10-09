import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Fragment, useEffect, useCallback } from "react";
import useMarketplace from "@/hooks/useMarketplace";
import { useSearchParams } from "react-router";
import TabsPanelUI from "./tabs-panel-ui";
import { cn } from "@/lib/cn";

const tabs: {
  id: number;
  label: string;
  value: "all" | "sold" | "purchased" | "relist";
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
    label: "Purchased",
    value: "purchased",
  },
  {
    id: 4,
    label: "Relist NFTs",
    value: "relist",
  },
];

export default function Tabs() {
  const { onFilterByStatusUserItems } = useMarketplace();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter =
    (searchParams.get("filter") as "all" | "sold" | "purchased" | "relist") ||
    "all";

  const selectedIndex = tabs.findIndex((tab) => tab.value === currentFilter);

  useEffect(() => {
    onFilterByStatusUserItems(currentFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFilter]);

  const handleFilterChange = useCallback(
    (value: "all" | "sold" | "purchased" | "relist") => {
      setSearchParams({ filter: value });
    },
    [setSearchParams]
  );

  return (
    <TabGroup
      selectedIndex={selectedIndex === -1 ? 0 : selectedIndex}
      onChange={(index) => handleFilterChange(tabs[index].value)}
      className="w-full flex flex-col items-center justify-center gap-x-4"
    >
      <TabList className="flex items-center justify-between md:justify-center w-full px-4 lg:px-0 md:gap-x-12 font-display font-semibold">
        {tabs.map((tab) => (
          <Tab as={Fragment} key={tab.id}>
            {({ selected }) => (
              <div className="relative outline-none">
                <span
                  className={cn(
                    "text-text-secondary outline-none cursor-pointer block lg:text-base text-sm",
                    selected && "text-text-primary"
                  )}
                >
                  {tab.label}
                </span>
                <div
                  className={cn(
                    "w-12 h-[2px] bg-accent absolute left-1/2 -translate-x-1/2 -bottom-4.5 opacity-0 transition-opacity ease-in-out duration-200",
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
