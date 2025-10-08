import { Tab, TabList } from "@headlessui/react";
import { cn } from "@/lib/cn";

const widthProccess: Record<number, string> = {
  0: "0",
  1: "32",
  2: "60",
  3: "100",
};

const tabs = [
  {
    id: 1,
    label: "Generate",
    position: "left-0",
  },
  {
    id: 2,
    label: "Artwork",
    position: "right-4.5 -translate-x-1/2",
  },
  {
    id: 3,
    label: "Customize",
    position: "right-7 -translate-x-1/2 ",
  },
  {
    id: 4,
    label: "Save & Publish",
    position: "right-0",
  },
];

export default function TabsListUI({
  selectedIndex,
}: {
  selectedIndex: number;
}) {
  return (
    <TabList className="flex items-center justify-between w-full lg:justify-normal lg:w-auto lg:gap-x-20 font-display font-semibold relative">
      {tabs.map((tab, index) => (
        <Tab key={tab.id}>
          {({ selected }) => (
            <div className="relative outline-none">
              <span
                className={cn(
                  "text-text-secondary outline-none cursor-pointer text-xs lg:text-base",
                  selected && "text-text-primary"
                )}
              >
                {tab.label}
              </span>

              <div
                className={cn(
                  "size-3 rounded-full absolute -bottom-6 z-20",
                  tab.position,
                  selected
                    ? "border-2 bg-bg border-accent"
                    : selectedIndex > index
                    ? "bg-accent border-none"
                    : "bg-card border-2 border-text-muted"
                )}
              ></div>
            </div>
          )}
        </Tab>
      ))}

      {/* Progress bar */}
      <div className="absolute -bottom-4 left-0 w-full">
        <div className="absolute top-0 left-0 h-1 w-full bg-border"></div>

        <div
          className="absolute top-0 left-0 z-10 h-1 bg-accent transition-all duration-300 ease-in-out"
          style={{
            width: `${widthProccess[selectedIndex]}%`,
          }}
        ></div>
      </div>
    </TabList>
  );
}
