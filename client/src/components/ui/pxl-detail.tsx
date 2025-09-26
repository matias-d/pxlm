import { useDisableScroll } from "@/hooks/useDisabelScroll";
import useMarketplace from "@/hooks/useMarketplace";
import { Copy, Plus, X } from "lucide-react";
import { Link } from "react-router";
import Logo from "../widgets/logo";
import { shortenAddress } from "@/utils/shorten-address";
import AvatarUI from "./avatar-ui";
import { Tooltip } from "./tooltip";

export default function PxlDetails() {
  const { items, account } = useMarketplace();

  useDisableScroll(true);

  const selected = items[1];

  return (
    <>
      <div className="fixed h-[calc(100vh-3rem)] top-1/2 -translate-y-1/2 w-full my-4 max-w-[1440px] rounded-lg bg-card z-40 mx-auto overflow-hidden">
        <section className="h-full">
          <header className="flex w-full items-center justify-between border-b border-border py-4 pl-14 pr-4">
            <div className="flex items-center gap-x-2">
              {items?.map((pxl) => (
                <img
                  key={pxl.tokenId}
                  alt={`PXL Media #${pxl?.tokenId}`}
                  src={pxl.image}
                  className="size-12 rounded-md"
                />
              ))}
            </div>
            <Link
              to="/marketplace"
              className="hover:bg-card-super-light p-2 rounded-full border border-border transition-colors"
            >
              <X />
            </Link>
          </header>
          <article className="flex items-start w-full h-[calc(100%-3rem)] ">
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
            <section className="flex-1 pt-8 px-8  bg-card-dark h-full">
              <h2 className="text-3xl font-semibold font-accent text-white mb-4">
                {selected?.name}
              </h2>
              <div className="flex items-center w-full justify-between">
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
                    <button className="cursor-pointer">
                      <Copy size={20} />
                    </button>
                  </Tooltip>

                  <Tooltip content="Add to cart" className="whitespace-nowrap">
                    <button className="cursor-pointer">
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
            </section>
          </article>
        </section>
      </div>
      <div className="inset-0 fixed z-30 bg-black/50"></div>
    </>
  );
}
