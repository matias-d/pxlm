import Button from "@/components/ui/button";
import useMarketplace from "@/hooks/useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import { Group } from "lucide-react";
import { Link } from "react-router";

interface Props {
  selected: IPxl;
  onOpenDrawer: () => void;
}

export default function ItemButtonAction({ selected, onOpenDrawer }: Props) {
  const { account } = useMarketplace();

  const isSeller = selected.seller === account?.address;
  const isOwner = selected.owner === account?.address;
  const isSold = selected.sold;
  return (
    <>
      {isOwner && isSold ? (
        <Button className="w-full h-12 bg-accent-secondary ring-accent-secondary">
          Purchased
        </Button>
      ) : isSeller ? (
        <Button className="w-full h-12" asChild>
          <Link
            to="/marketplace/collection"
            className="flex items-center gap-x-3"
          >
            Collection <Group />
          </Link>
        </Button>
      ) : !isSold ? (
        <Button className="w-full h-12" onClick={onOpenDrawer}>
          Buy now
        </Button>
      ) : (
        <Button className="w-full h-12">Sold out</Button>
      )}
    </>
  );
}
