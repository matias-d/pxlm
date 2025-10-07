import { ArrowLeft, ArrowRight } from "lucide-react";
import useMarketplace from "@/hooks/useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

interface Props {
  selected: IPxl | null;
}

export default function ItemCarrousel({ selected }: Props) {
  const { marketplaceItems } = useMarketplace();
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    if (marketplaceItems && selected) {
      const selectedIndex = marketplaceItems.findIndex(
        (item) => item.tokenId === selected.tokenId
      );
      if (selectedIndex !== -1) {
        if (selectedIndex < startIndex) {
          setStartIndex(selectedIndex);
        } else if (selectedIndex >= startIndex + itemsPerPage) {
          setStartIndex(selectedIndex - itemsPerPage + 1);
        }
      }
    }
  }, [selected, marketplaceItems, startIndex]);

  const handlePrevious = () => {
    if (marketplaceItems && startIndex > 0) {
      const prevItem = marketplaceItems[startIndex - 1];
      navigate(`/marketplace/item/${prevItem.tokenId}`);
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (
      marketplaceItems &&
      startIndex < marketplaceItems.length - itemsPerPage
    ) {
      const nextItem = marketplaceItems[startIndex + itemsPerPage];
      navigate(`/marketplace/item/${nextItem.tokenId}`);
      setStartIndex((prev) =>
        Math.min(marketplaceItems.length - itemsPerPage, prev + 1)
      );
    }
  };

  const handleItemClick = (pxl: IPxl) => {
    navigate(`/marketplace/item/${pxl.tokenId}`);
  };

  const visibleItems =
    marketplaceItems?.slice(startIndex, startIndex + itemsPerPage) || [];
  const canGoPrevious = startIndex > 0;
  const canGoNext = marketplaceItems
    ? startIndex < marketplaceItems.length - itemsPerPage
    : false;

  return (
    <div className="flex items-center gap-x-12 px-12">
      <button
        onClick={handlePrevious}
        disabled={!canGoPrevious}
        className="bg-card-light border border-border size-10 flex items-center justify-center rounded-sm hover:bg-card-super-light transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card-light"
      >
        <ArrowLeft size={14} />
      </button>
      <section className="flex items-center gap-x-2">
        {visibleItems.map((pxl) => {
          const isSelected = pxl.tokenId === selected?.tokenId;
          return (
            <button
              key={pxl.tokenId}
              onClick={() => handleItemClick(pxl)}
              className={`size-10 rounded-md transition-all cursor-pointer ${
                isSelected
                  ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-background"
                  : "opacity-50 hover:opacity-75"
              }`}
            >
              <img
                alt={`PXL Media #${pxl?.tokenId}`}
                src={pxl.image}
                className="size-full rounded-md object-cover"
              />
            </button>
          );
        })}
      </section>
      <button
        onClick={handleNext}
        disabled={!canGoNext}
        className="bg-card-light border border-border size-10 flex items-center justify-center rounded-sm hover:bg-card-super-light transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-card-light"
      >
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
