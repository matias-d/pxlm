import ItemCarrousel from "@/components/marketplace/item/item-carrousel";
import ItemTabs from "@/components/marketplace/item/tabs/item-tabs";
import { useDisableScroll } from "@/hooks/useDisabelScroll";
import { Link, useNavigate, useParams } from "react-router";
import { shortenAddress } from "@/utils/shorten-address";
import useMarketplace from "@/hooks/useMarketplace";
import { Tooltip } from "@/components/ui/tooltip";
import AvatarUI from "@/components/ui/avatar-ui";
import { Copy, Plus, X } from "lucide-react";
import Logo from "@/components/widgets/logo";
import type { IPxl } from "@/interfaces/pxl";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

export default function Item() {
  useDisableScroll(true);

  const { tokenId } = useParams();
  const navigate = useNavigate();

  const { getNFT, account } = useMarketplace();

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

  console.log(selected);

  if (selected === null) return <section>Cargando..</section>;

  return (
    <>
      <div className="fixed h-[calc(100vh-4rem)] top-1/2 -translate-y-1/2 w-full my-4 max-w-[1440px] rounded-lg bg-card z-40 mx-auto overflow-hidden">
        <section className="h-full">
          <header className="flex w-full items-center justify-between border-b border-border py-4 pl-14 pr-4">
            <ItemCarrousel selected={selected} />
            <Link
              to="/marketplace"
              className="hover:bg-card-super-light p-2 rounded-full border border-border transition-colors"
            >
              <X />
            </Link>
          </header>
          <article className="flex items-start w-full h-[calc(100%-3rem)]  overflow-y-auto">
            <section className="flex-1 px-14 pt-8 border-r border-border h-full relative">
              <div className="h-[calc(100%-4rem)] p-6 border border-border bg-card-dark rounded-md">
                <img
                  key={selected?.tokenId}
                  alt={`PXL Media #${selected?.tokenId}`}
                  src={selected?.image}
                  className="w-full h-full object-cover shadow rounded-md"
                />
              </div>
            </section>
            <section className="flex-1 pt-8 px-8  bg-card-dark h-full  overflow-auto pb-6">
              <h2 className="text-3xl font-semibold font-accent text-white mb-4">
                {selected?.name}
              </h2>
              <div className="flex items-center w-full justify-between mb-8">
                <div className="flex items-center gap-x-4">
                  <Logo />
                  <span className="text-text-secondary">|</span>
                  <div className="flex items-center gap-x-1">
                    <p className="text-text-secondary text-sm">Owned by </p>
                    <div className="flex items-center gap-x-1">
                      <p className="text-text-primary">
                        {shortenAddress(account?.address)}
                      </p>
                      <AvatarUI username={account?.address} size={20} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <Tooltip
                    content="Copy item url"
                    className="whitespace-nowrap"
                  >
                    <button className="cursor-pointer  rounded-full hover:bg-card transition-colors">
                      <Copy size={20} />
                    </button>
                  </Tooltip>

                  <Tooltip content="Add to cart" className="whitespace-nowrap">
                    <button className="cursor-pointer  rounded-full hover:bg-card transition-colors">
                      <Plus size={20} />
                    </button>
                  </Tooltip>
                  <span className="text-text-secondary mb-1">|</span>

                  <Tooltip
                    content="Generator PXL"
                    className="whitespace-nowrap"
                  >
                    <a
                      href="https://www.dicebear.com"
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className="text-xs text-text-secondary hover:underline mb-1 block"
                    >
                      <img
                        src="/dicebear-logo.ico"
                        className="size-5 rounded-full"
                      />
                    </a>
                  </Tooltip>
                </div>
              </div>

              <Card className="space-y-3 mb-6">
                <header className="flex items-center w-full justify-between">
                  <div>
                    <p className="text-xs text-text-secondary">RARITY</p>
                    <p className="font-semibold font-display capitalize">
                      {selected.rarity_tier}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">SCORE</p>
                    <p className="font-semibold font-display">
                      #{selected.rarity_score}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">LAST SALE</p>
                    <p className="font-semibold font-display">
                      {selected.previousListings
                        ? selected.previousListings[
                            selected.previousListings.length - 1
                          ].price
                        : "-"}
                    </p>
                  </div>
                </header>
                <div className="h-[1px] bg-border my-5" />
                <div className="mb-4">
                  <span className="text-xs text-text-secondary block mb-1">
                    BUY FOR
                  </span>
                  <p className="text-2xl font-semibold font-display">
                    {selected.price} TBNB
                  </p>
                </div>
                <Button className="w-full h-12">Buy now</Button>
              </Card>
              <ItemTabs selected={selected} />
            </section>
          </article>
        </section>
      </div>
      <div className="inset-0 fixed z-30 bg-black/50"></div>
    </>
  );
}
