import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import useCreate from "../../../hooks/create/useCreate";
import GeneratePXL from "./tabs/generate-pxl";
import { Fragment } from "react/jsx-runtime";
import { cn } from "../../../lib/cn";
import Artwork from "./tabs/artwork";

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
    position: " left-0",
  },
  {
    id: 2,
    label: "Artwork",
    position: "right-4.5 -translate-x-1/2",
  },
  {
    id: 3,
    label: "Customize",
    position: " right-7 -translate-x-1/2 ",
  },
  {
    id: 4,
    label: "Save & Publish",
    position: " right-0",
  },
];

export default function Tabs() {
  const { goToNextStep, setSelectedIndex, selectedIndex } = useCreate();

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      className="relative w-full flex flex-col items-center justify-center gap-x-4"
    >
      {({ selectedIndex }) => (
        <>
          <TabList className="flex items-center gap-x-20 font-display font-semibold relative">
            {tabs.map((tab, index) => (
              <Tab key={tab.id} as={Fragment}>
                {({ selected }) => (
                  <div className="relative outline-none">
                    <button
                      className={cn(
                        "text-text-secondary outline-none cursor-pointer",
                        selected && "text-text-primary"
                      )}
                    >
                      {tab.label}
                    </button>

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

          <TabPanels className="mt-20">
            <TabPanel>
              <GeneratePXL onNextStep={goToNextStep} />
            </TabPanel>
            <TabPanel>
              <Artwork onNextStep={goToNextStep} />
            </TabPanel>
            <TabPanel>Customize</TabPanel>
            <TabPanel>Save & Publish</TabPanel>
          </TabPanels>
        </>
      )}
    </TabGroup>
  );
}
