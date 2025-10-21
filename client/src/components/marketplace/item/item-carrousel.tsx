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
    if (marketplaceItems && selected) {
      const currentIndex = marketplaceItems.findIndex(
        (item) => item.tokenId === selected.tokenId
      );
      if (currentIndex > 0) {
        const prevItem = marketplaceItems[currentIndex - 1];
        navigate(`/marketplace/item/${prevItem.tokenId}`);
      }
    }
  };

  const handleNext = () => {
    if (marketplaceItems && selected) {
      const currentIndex = marketplaceItems.findIndex(
        (item) => item.tokenId === selected.tokenId
      );
      if (currentIndex < marketplaceItems.length - 1) {
        const nextItem = marketplaceItems[currentIndex + 1];
        navigate(`/marketplace/item/${nextItem.tokenId}`);
      }
    }
  };

  const handleItemClick = (pxl: IPxl) => {
    navigate(`/marketplace/item/${pxl.tokenId}`);
  };

  const visibleItems =
    marketplaceItems?.slice(startIndex, startIndex + itemsPerPage) || [];

  const currentIndex =
    marketplaceItems && selected
      ? marketplaceItems.findIndex((item) => item.tokenId === selected.tokenId)
      : -1;

  const canGoPrevious = currentIndex > 0;
  const canGoNext = marketplaceItems
    ? currentIndex < marketplaceItems.length - 1
    : false;

  return (
    <div className="flex items-center gap-x-2 lg:gap-x-12 lg:px-12">
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
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-bg"
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
