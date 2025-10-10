import { Tooltip } from "@/components/ui/tooltip";
import { Funnel, X } from "lucide-react";
import { useState } from "react";
import Filters from "./filters";
import { cn } from "@/lib/cn";

export default function FilterMobile({
  to = "marketplace",
}: {
  to?: "marketplace" | "users";
}) {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(!open);

  return (
    <>
      <Tooltip position="top" content="Table">
        <button
          onClick={onOpen}
          className={cn(
            " h-14 px-4 rounded-md outline-none  hover:text-text-primary transition-colors cursor-pointer   bg-card-light border-2  border-border text-text-primary"
          )}
        >
          <Funnel />
        </button>
      </Tooltip>

      <div
        className={cn(
          "w-full fixed bottom-0 left-0 h-[400px] transition-all duration-300 ease-in bg-card z-40 rounded-t-2xl border-t border-border",
          open ? "bottom-0" : "-bottom-full"
        )}
      >
        <section className="p-4  ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-xl">Filters</h2>
            <button className="" onClick={onOpen}>
              <X />
            </button>
          </div>
          <Filters to={to} />
        </section>
      </div>
    </>
  );
}
