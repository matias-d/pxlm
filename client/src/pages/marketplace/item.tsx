import ItemCarrousel from "@/components/marketplace/item/item-carrousel";
import ItemDetails from "@/components/marketplace/item/item-details";
import { useLocation, useNavigate, useParams } from "react-router";
import ItemImage from "@/components/marketplace/item/item-image";
import { useDisableScroll } from "@/hooks/useDisabelScroll";
import useMarketplace from "@/hooks/useMarketplace";
import Loading from "@/components/ui/loading";
import type { IPxl } from "@/interfaces/pxl";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function Item() {
  useDisableScroll(true);

  const { getNFT } = useMarketplace();

  const { tokenId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const prevPath = location.state?.from || "/marketplace";

  const onClose = () => navigate(prevPath);

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

  if (selected === null)
    return (
      <section className="fixed h-[calc(100vh-4rem)] top-1/2 -translate-y-1/2 w-full my-4 max-w-[1440px] rounded-lg bg-card z-40 mx-auto overflow-hidden">
        <Loading label="Loading pxl..." src="/assets/art-loading.svg" />
      </section>
    );

  return (
    <>
      <div className="fixed h-[calc(100vh-4rem)] top-1/2 -translate-y-1/2 w-full my-4 max-w-[1440px] rounded-lg bg-card z-40 mx-auto overflow-hidden">
        <section className="h-full">
          <header className="flex w-full items-center justify-between border-b border-border py-4 pl-14 pr-4">
            <ItemCarrousel selected={selected} />
            <button
              onClick={onClose}
              className="hover:bg-card-super-light p-2 rounded-full border border-border transition-colors cursor-pointer"
            >
              <X />
            </button>
          </header>
          <article className="flex items-start w-full h-[calc(100%-3rem)]  overflow-y-auto">
            <ItemImage selected={selected} />
            <ItemDetails selected={selected} />
          </article>
        </section>
      </div>
      <div className="inset-0 fixed z-30 bg-black/50" onClick={onClose}></div>
    </>
  );
}
