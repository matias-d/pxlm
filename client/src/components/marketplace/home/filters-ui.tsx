import SelectUI from "../../ui/select-ui";
import { Tooltip } from "../../ui/tooltip";
import ButtonGrid from "./button-grid";

const selects1 = [
  { id: 1, label: "Price: Low to High" },
  { id: 2, label: "Price: High to Low" },
];

const selects2 = [
  { id: 1, label: "Common" },
  { id: 2, label: "Rare" },
  { id: 3, label: "Epic" },
  { id: 3, label: "Legendary" },
  { id: 3, label: "Epic" },
];

export default function FiltersUI() {
  return (
    <section className="flex items-start w-full justify-between mb-12">
      <div className="flex items-start gap-x-2">
        <SelectUI selects={selects1} />
        <SelectUI
          selects={selects2}
          placeholder="Select attributes to filter"
        />
      </div>
      <Tooltip position="top" content="Grid">
        <ButtonGrid />
      </Tooltip>
    </section>
  );
}
