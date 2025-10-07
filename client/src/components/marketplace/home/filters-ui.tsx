import { LayoutGrid, TableProperties } from "lucide-react";
import useMarketplace from "@/hooks/useMarketplace";
import { Tooltip } from "../../ui/tooltip";
import SelectUI from "../../ui/select-ui";
import { cn } from "@/lib/cn";

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
      <div className="flex items-start gap-x-2">
        <SelectUI fields={fields} onSelect={onTogglePrice} />
        <SelectUI
          placeholder="Select attributes to filter"
          onSelect={onFilterByRarity}
          fields={fields2}
        />
      </div>
      <div className="flex items-center gap-x-1">
        <Tooltip position="top" content="Grid">
          <button
            onClick={() => onLayout("grid")}
            className={cn(
              " h-14 px-4 rounded-md outline-none  hover:text-text-primary transition-colors cursor-pointer border-2 border-transparent text-text-secondary",
              layout === "grid" &&
                "bg-card-light border-2  border-border text-text-primary"
            )}
          >
            <LayoutGrid />
          </button>
        </Tooltip>
        <Tooltip position="top" content="Table">
          <button
            onClick={() => onLayout("table")}
            className={cn(
              " h-14 px-4 rounded-md outline-none  hover:text-text-primary transition-colors cursor-pointer border-2 border-transparent text-text-secondary",
              layout === "table" &&
                "bg-card-light border-2  border-border text-text-primary"
            )}
          >
            <TableProperties />
          </button>
        </Tooltip>
      </div>
    </section>
  );
}
