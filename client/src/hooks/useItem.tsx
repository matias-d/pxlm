import { useNavigate, useParams } from "react-router";
import useMarketplace from "./useMarketplace";
import type { IPxl } from "@/interfaces/pxl";
import { useEffect, useState } from "react";

export default function useItem() {
  const { getNFT, marketplaceItems } = useMarketplace();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IPxl | null>(null);

  useEffect(() => {
    if (!itemId) {
      navigate("/marketplace");
      return;
    }

    const item = getNFT(Number(itemId));

    if (!item) {
      navigate("/marketplace");
      return;
    }

    setSelected(item);
  }, [navigate, itemId, getNFT, marketplaceItems]);
  return {
    selected,
  };
}
