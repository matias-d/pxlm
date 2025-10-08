import { LayoutGrid, TableProperties } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/cn";

interface Props {
  layout: "grid" | "table";
  onLayout: (layout: "grid" | "table") => void;
}

export default function ButtonLayout({ layout, onLayout }: Props) {
  return (
    <>
      <div className="hidden md:flex items-center gap-x-1">
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

      {/* Mobile button layout */}
      <div className="block md:hidden">
        {layout === "grid" ? (
          <Tooltip position="top" content="Grid">
            <button
              onClick={() => onLayout("table")}
              className={cn(
                " h-14 px-4 rounded-md outline-none  hover:text-text-primary transition-colors cursor-pointer border-2 border-transparent text-text-secondary",
                layout === "grid" &&
                  "bg-card-light border-2  border-border text-text-primary"
              )}
            >
              <LayoutGrid />
            </button>
          </Tooltip>
        ) : (
          <Tooltip position="top" content="Table">
            <button
              onClick={() => onLayout("grid")}
              className={cn(
                " h-14 px-4 rounded-md outline-none  hover:text-text-primary transition-colors cursor-pointer border-2 border-transparent text-text-secondary",
                layout === "table" &&
                  "bg-card-light border-2  border-border text-text-primary"
              )}
            >
              <TableProperties />
            </button>
          </Tooltip>
        )}
      </div>
    </>
  );
}
