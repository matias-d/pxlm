import { Tab, TabGroup, TabList } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../../../lib/cn";
import TabsPanelUI from "./tabs-panel-ui";

export default function Tabs() {
  return (
    <TabGroup className="w-full flex flex-col items-center justify-center gap-x-4">
      <TabList className="flex items-center gap-x-12 font-display font-semibold">
        <Tab as={Fragment}>
          {({ selected }) => (
            <div className="relative outline-none">
              <button
                className={cn(
                  " text-text-secondary outline-none cursor-pointer",
                  selected && "text-text-primary"
                )}
              >
                All
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
        <Tab as={Fragment}>
          {({ selected }) => (
            <div className="relative outline-none">
              <button
                className={cn(
                  " text-text-secondary outline-none cursor-pointer",
                  selected && "text-text-primary"
                )}
              >
                Sold
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
      </TabList>
      <hr className="w-full border-[0.5px] border-border my-4" />
      <TabsPanelUI />
    </TabGroup>
  );
}
