import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import useCreate from "@/hooks/create/useCreate";
import GeneratePXL from "./panel/generate-pxl";
import Artwork from "./panel/artwork/artwork";
import Customize from "./panel/customize";
import TabsListUI from "./tabs-list-ui";
import Save from "./panel/save";

export default function Tabs() {
  const {
    onGeneratePXL,
    load,
    pxl,
    onPrice,
    goToNextStep,
    goToPrevStep,
    selectedIndex,
    setSelectedIndex,
    onReset,
  } = useCreate();

  return (
    <>
      <TabGroup
        className="relative w-full flex flex-col items-center justify-center gap-x-4"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        {({ selectedIndex }) => (
          <>
            <TabsListUI selectedIndex={selectedIndex} />

            <TabPanels className="mt-20">
              {/* Generate PXL Panel */}
              <TabPanel>
                <GeneratePXL onGeneratePXL={onGeneratePXL} />
              </TabPanel>

              {/* Artwork Panel */}
              <TabPanel>
                <Artwork
                  onNextStep={goToNextStep}
                  pxl={pxl}
                  onGeneratePXL={onGeneratePXL}
                  loading={load}
                />
              </TabPanel>

              {/* Customize Panel */}
              <TabPanel>
                <Customize
                  pxl={pxl}
                  onPrice={onPrice}
                  onPrevStep={goToPrevStep}
                  onNextStep={goToNextStep}
                />
              </TabPanel>

              {/* Save Panel */}
              <TabPanel>
                <Save pxl={pxl} onPrevStep={goToPrevStep} onReset={onReset} />
              </TabPanel>
            </TabPanels>
          </>
        )}
      </TabGroup>
    </>
  );
}
