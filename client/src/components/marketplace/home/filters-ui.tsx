import useMarketplace from "@/hooks/useMarketplace";
import { Tooltip } from "../../ui/tooltip";
import SelectUI from "../../ui/select-ui";
import ButtonGrid from "./button-grid";

const fields = [
  { id: 1, label: "Price: Low to High", value: "low-to-high" },
  { id: 2, label: "Price: High to Low", value: "high-to-low" },
];

const fields2 = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "Common", value: "common" },
  { id: 3, label: "Uncommon", value: "uncommon" },
  { id: 4, label: "Rare", value: "rare" },
  { id: 5, label: "Legendary", value: "legendary" },
  { id: 6, label: "Epic", value: "epic" },
];

export default function FiltersUI() {
  const { items, updateItemsOrder, onFilterByRarity } = useMarketplace();

  const onTogglePrice = (order: string) => {
    updateItemsOrder(order as "low-to-high" | "high-to-low", items);
  };

  return (
    <section className="flex items-start w-full justify-between mb-12">
      <div className="flex items-start gap-x-2">
        <SelectUI fields={fields} onSelect={onTogglePrice} />
        <SelectUI
          placeholder="Select attributes to filter"
          onSelect={onFilterByRarity}
          fields={fields2}
        />
      </div>
      <Tooltip position="top" content="Grid">
        <ButtonGrid />
      </Tooltip>
    </section>
  );
}
