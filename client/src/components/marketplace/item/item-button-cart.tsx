import { Tooltip } from "@/components/ui/tooltip";
import useCart from "@/hooks/useCart";
import useMarketplace from "@/hooks/useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import { Plus } from "lucide-react";

interface Props {
  selected: IPxl;
}

export default function ItemButtonCart({ selected }: Props) {
  const { account } = useMarketplace();
  const { addCart } = useCart();

  const isSeller = selected.seller === account?.address;
  const isOwner = selected.owner === account?.address;
  const isSold = selected.sold;

  if (isSeller || isOwner || isSold) return null;
  return (
    <Tooltip content="Add to cart" className="whitespace-nowrap">
      <button
        onClick={() => addCart(selected)}
        className="cursor-pointer  rounded-full hover:bg-card transition-colors size-8 flex items-center justify-center "
      >
        <Plus size={20} />
      </button>
    </Tooltip>
  );
}
