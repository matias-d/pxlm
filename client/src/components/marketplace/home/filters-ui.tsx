import useMarketplace from "@/hooks/useMarketplace";
import SelectUI from "../../ui/select-ui";
import ButtonLayout from "./button-layout";

const fields = [
  { id: 1, label: "Price: Low to High", value: "low-to-high" },
  { id: 2, label: "Price: High to Low", value: "high-to-low" },
];

const fields2 = [
  { id: 1, label: "All", value: "all" },
  { id: 2, label: "Common", value: "common" },
  { id: 3, label: "Rare", value: "rare" },
  { id: 5, label: "Epic", value: "epic" },
  { id: 4, label: "Legendary", value: "legendary" },
];

interface Props {
  onLayout: (layout: "grid" | "table") => void;
  layout: "grid" | "table";
}

export default function FiltersUI({ layout, onLayout }: Props) {
  const { marketplaceItems, updateItemsOrder, onFilterByRarity } =
    useMarketplace();

  const onTogglePrice = (order: string) => {
    updateItemsOrder(order as "low-to-high" | "high-to-low", marketplaceItems);
  };

  return (
    <section className="flex items-start w-full justify-between mb-8">
      <div className="flex items-start gap-2 flex-col lg:flex-row">
        <SelectUI fields={fields} onSelect={onTogglePrice} />
        <SelectUI
          placeholder="Select attributes to filter"
          onSelect={onFilterByRarity}
          fields={fields2}
        />
      </div>

      <ButtonLayout layout={layout} onLayout={onLayout} />
    </section>
  );
}
