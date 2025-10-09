import { useNavigate, useParams } from "react-router";
import useMarketplace from "./useMarketplace";
import { useEffect, useState } from "react";
import type { IPxl } from "@/interfaces/pxl";

export default function useItem() {
  const { getNFT } = useMarketplace();
  const { tokenId } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IPxl | null>(null);

  useEffect(() => {
    if (!tokenId) {
      navigate("/marketplace");
      return;
    }

    const item = getNFT(Number(tokenId));

    if (!item) {
      navigate("/marketplace");
      return;
    }

    setSelected(item);
  }, [navigate, tokenId]);

  return {
    selected,
  };
}
