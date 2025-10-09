import { useNavigate, useParams } from "react-router";
import useMarketplace from "./useMarketplace";
import { useEffect, useState } from "react";
import type { IPxl } from "@/interfaces/pxl";

export default function useItem() {
  const { getNFT } = useMarketplace();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IPxl | null>(null);

  useEffect(() => {
    if (!itemId) {
      console.log("NO HAY");
      navigate("/marketplace");
      return;
    }

    const item = getNFT(Number(itemId));
    console.log("ITEM____", item);

    if (!item) {
      console.log("NO HAY ITEM");

      navigate("/marketplace");
      return;
    }

    setSelected(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, itemId]);

  return {
    selected,
  };
}
