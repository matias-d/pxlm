import ButtonLayout from "./button-layout";
import FilterMobile from "./filter-mobile";
import Filters from "./filters";

interface Props {
  onLayout: (layout: "grid" | "table") => void;
  to?: "marketplace" | "users";
  layout: "grid" | "table";
}

export default function FiltersUI({
  layout,
  onLayout,
  to = "marketplace",
}: Props) {
  return (
    <section className="flex items-start w-full justify-between mb-8">
      <div className="block md:hidden">
        <FilterMobile to={to} />
      </div>

      <div className="hidden md:block">
        <Filters to={to} />
      </div>

      <ButtonLayout layout={layout} onLayout={onLayout} />
    </section>
  );
}
