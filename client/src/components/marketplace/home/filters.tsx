import SelectUI from "@/components/ui/select-ui";
import useMarketplace from "@/hooks/useMarketplace";

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
export default function Filters({
  to = "marketplace",
}: {
  to?: "marketplace" | "users";
}) {
  const {
    updateItemsOrder,
    onFilterByRarity,
    updateItemsOrderUsers,
    onFilterByRarityUsers,
  } = useMarketplace();

  const onTogglePrice = (order: string) => {
    if (to === "marketplace")
      updateItemsOrder(order as "low-to-high" | "high-to-low");
    else updateItemsOrderUsers(order as "low-to-high" | "high-to-low");
  };

  return (
    <div className="flex items-center lg:items-start gap-2 flex-col md:flex-row w-full ">
      <SelectUI fields={fields} onSelect={onTogglePrice} />
      <SelectUI
        placeholder="Select attributes to filter"
        onSelect={
          to === "marketplace" ? onFilterByRarity : onFilterByRarityUsers
        }
        fields={fields2}
      />
    </div>
  );
}
