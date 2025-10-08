import { useDisableScroll } from "@/hooks/useDisabelScroll";
import { cn } from "@/lib/cn";
import {
  BookAudio,
  Dot,
  Group,
  Menu,
  PackagePlus,
  Store,
  X,
} from "lucide-react";
import { useState } from "react";
import Logo from "../logo";
import { Link } from "react-router";

export default function SidebarMenu() {
  const [open, setOpen] = useState(false);

  useDisableScroll(open);

  const onOpen = () => setOpen(!open);

  return (
    <>
      <button onClick={onOpen} className="block lg:hidden">
        {" "}
        <Menu />
      </button>
      <aside
        className={cn(
          "bg-card w-full min-h-screen lg:hidden fixed inset-0 z-30 pt-6 px-4 transition-all duration-300 ease-in-out",
          open ? "left-0" : "-left-full"
        )}
      >
        <header className="mb-4 flex items-center justify-between border-b border-border pb-6">
          <Logo />
          <button
            onClick={onOpen}
            className="hover:bg-card-super-light bg-card-super-light p-2 rounded-full border border-border transition-colors cursor-pointer"
          >
            <X />
          </button>
        </header>
        <nav className="space-y-6">
          <Link
            onClick={onOpen}
            to="/marketplace"
            className="font-display font-semibold flex items-center gap-x-3"
          >
            <div className="bg-card-super-light p-3 rounded-sm border border-border">
              <Store />
            </div>
            Marketplace
          </Link>

          <Link
            onClick={onOpen}
            to="/marketplace/guide"
            className="font-display font-semibold flex items-center gap-x-3"
          >
            <div className="bg-card-super-light p-3 rounded-sm border border-border">
              <BookAudio />
            </div>
            Guide
          </Link>

          <Link
            onClick={onOpen}
            to="/marketplace/collection"
            className="font-display font-semibold flex items-center gap-x-3"
          >
            <div className="bg-card-super-light p-3 rounded-sm border border-border">
              <Group />
            </div>
            Collection
          </Link>

          <Link
            onClick={onOpen}
            to="/marketplace/create"
            className="font-display font-semibold flex items-center gap-x-3"
          >
            <div className="bg-card-super-light p-3 rounded-sm border border-border">
              <PackagePlus />
            </div>
            Create
          </Link>
        </nav>

        <div className="h-[1px] w-full bg-border my-4" />
        <div className="flex items-center ">
          <p className="text-sm text-text-secondary/40">Network:</p>
          <p className="text-sm font-display  text-text-secondary flex items-center">
            <Dot
              className="glow-animate -mr-1 animate-pulse drop-shadow-[0_0_5px_rgba(249,229,163,1)] "
              size={36}
              color="#f6d367"
            />
            BSC Testnet
          </p>
        </div>

        <span className="text-xs text-text-secondary/40 absolute bottom-2 left-1/2 -translate-x-1/2">
          by{" "}
          <a
            href="https://github.com/matias-d"
            target="_blank"
            rel="noreferrer"
          >
            matias-d
          </a>{" "}
          ♥
        </span>
      </aside>
    </>
  );
}
