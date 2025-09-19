import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import useCreate from "@/hooks/create/useCreate";
import GeneratePXL from "./panel/generate-pxl";
import Customize from "./panel/customize";
import TabsListUI from "./tabs-list-ui";
import Artwork from "./panel/artwork";
import Save from "./panel/save";

export default function Tabs() {
  const {
    onGeneratePXL,
    load,
    pxl,
    goToNextStep,
    goToPrevStep,
    selectedIndex,
    setSelectedIndex,
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
              <TabPanel>
                <GeneratePXL onGeneratePXL={onGeneratePXL} />
              </TabPanel>
              <TabPanel>
                <Artwork
                  onNextStep={goToNextStep}
                  attributes={pxl.attributes}
                  image={pxl.url}
                  loading={load}
                />
              </TabPanel>
              <TabPanel>
                <Customize
                  onNextStep={goToNextStep}
                  onPrevStep={goToPrevStep}
                />
              </TabPanel>
              <TabPanel>
                <Save onPrevStep={goToPrevStep} />
              </TabPanel>
            </TabPanels>
          </>
        )}
      </TabGroup>
    </>
  );
}
