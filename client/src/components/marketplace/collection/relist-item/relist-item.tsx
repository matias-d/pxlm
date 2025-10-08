import NotItems from "@/components/ui/not-items";
import Loading from "@/components/ui/loading";
import type { IPxl } from "@/interfaces/pxl";
import Button from "@/components/ui/button";
import SelectedCard from "./selected-card";

import { Link } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface Props {
  items: IPxl[];
  loading: boolean;
}

export default function RelistItem({ items, loading }: Props) {
  const [selected, setSelected] = useState<IPxl | null>(items[0] || null);

  const onSelect = (pxl: IPxl) => setSelected(pxl);

  if (loading)
    return <Loading label="Obtaining purchased collection" withIcon />;

  if (!selected) {
    return (
      <section className="flex justify-center items-center ">
        <NotItems message="You don't have any pxl to relist yet. Explore the marketplace and get your first one.">
          <Button className="h-4 text-xs px-4" asChild>
            <Link to="/marketplace">Marketplace</Link>
          </Button>
        </NotItems>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center">
      <header className="flex items-center gap-x-4 mb-12 bg-card min-w-1/2 p-4 rounded-md border border-border">
        {items.map((pxl) => (
          <button
            onClick={() => onSelect(pxl)}
            className={cn(
              "rounded-lg overflow-hidden cursor-pointer",
              selected === pxl
                ? "ring-2 ring-accent ring-offset-4 ring-offset-card "
                : "grayscale-50 hover:ring-2 hover:ring-accent hover:ring-offset-4 hover:ring-offset-card transition-all hover:grayscale-0 "
            )}
          >
            <img
              key={pxl.tokenId}
              alt={`PXL Media #${pxl.tokenId}`}
              src={pxl.image}
              className="size-20"
            />
          </button>
        ))}
      </header>

      <section>
        <SelectedCard selected={selected} onSelect={onSelect} items={items} />
      </section>
    </section>
  );
}
