import { shortenAddress } from "@/utils/shorten-address";
import { copyItemUrl } from "@/utils/copy-item-url";
import useMarketplace from "@/hooks/useMarketplace";
import { Tooltip } from "@/components/ui/tooltip";
import AvatarUI from "@/components/ui/avatar-ui";
import ItemButtonCart from "./item-button-cart";
import Logo from "@/components/widgets/logo";
import type { IPxl } from "@/interfaces/pxl";
import ItemTabs from "./tabs/item-tabs";
import Card from "@/components/ui/card";
import { Copy } from "lucide-react";
import useHistory from "@/hooks/useHistory";

interface Props {
  selected: IPxl;
  renderButtonAction: () => React.ReactNode;
}

export default function ItemDetails({ selected, renderButtonAction }: Props) {
  const { account, addressMP } = useMarketplace();
  const { lastSale } = useHistory({ item: selected });

  return (
    <section className="flex-1 p-4 lg:pt-8 lg:px-8  bg-card-dark h-full w-full overflow-auto pb-6 border-t border-border lg:border-t-0">
      <h2 className="text-2xl lg:text-3xl font-semibold font-accent text-white mb-4">
        {selected?.name}
      </h2>
      <header className="flex flex-col lg:flex-row gap-2 lg:gap-0 lg:items-center w-full justify-between mb-8">
        <div className="flex items-center gap-x-4">
          <Logo />
          <span className="text-text-secondary">|</span>
          <div className="flex items-center gap-x-1">
            <p className="text-text-secondary text-sm">Owned by </p>
            <div className="flex items-center gap-x-1">
              <p className="text-text-primary font-display">
                {selected.owner === addressMP
                  ? "Marketplace"
                  : shortenAddress(selected?.owner)}
              </p>
              {selected.owner !== addressMP && (
                <AvatarUI username={account?.address} size={20} />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center ">
            <Tooltip content="Copy item url" className="whitespace-nowrap">
              <button
                onClick={() => copyItemUrl(window.location.href)}
                className="cursor-pointer  rounded-full hover:bg-card transition-colors size-8 flex items-center justify-center "
              >
                <Copy size={20} />
              </button>
            </Tooltip>

            <ItemButtonCart selected={selected} />
          </div>
          <span className="text-text-secondary mr-2">|</span>

          <Tooltip content="Generator PXL" className="whitespace-nowrap">
            <a
              href="https://www.dicebear.com"
              referrerPolicy="no-referrer"
              target="_blank"
              className="text-xs text-text-secondary hover:underline  block"
            >
              <img src="/dicebear-logo.ico" className="size-6 rounded-full" />
            </a>
          </Tooltip>
        </div>
      </header>

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
              {lastSale ? lastSale.price : "-"}
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
        {renderButtonAction()}
      </Card>
      <ItemTabs selected={selected} />
    </section>
  );
}
