import type { IPxl } from "@/interfaces/pxl";
import { useState } from "react";

export default function useDrawer() {
  const [drawer, setDrawer] = useState<{ open: boolean; items: IPxl[] }>({
    open: false,
    items: [],
  });

  const onOpen = () => setDrawer((prev) => ({ ...prev, open: !drawer.open }));

  const closeDrawer = () => setDrawer((prev) => ({ ...prev, open: false }));

  const onBuy = (pxl: IPxl) => {
    setDrawer((prev) => ({ ...prev, items: [pxl] }));
    onOpen();
  };

  return {
    onOpenDrawer: onOpen,
    isOpen: drawer.open,
    pxls: drawer.items,
    closeDrawer,
    onBuy,
  };
}
