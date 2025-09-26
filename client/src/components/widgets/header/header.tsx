import Logo from "@/components/widgets/logo";
import { Dot } from "lucide-react";
import MenuUser from "./menu-user";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="rounded-md p-5 flex items-center justify-between bg-card shadow">
      <Logo />
      <Nav />
      <div className="flex items-center gap-x-6">
        <div className=" flex items-center gap-x-1 ">
          <p className="text-[10px] lg:text-xs text-text-secondary flex items-center">
            <Dot
              className="glow-animate -mr-2 animate-pulse drop-shadow-[0_0_5px_rgba(249,229,163,1)] "
              size={36}
              color="#f6d367"
            />
            BSC Testnet
          </p>
          <img src="/bnb-logo.svg" className="size-4" />
        </div>
        <MenuUser />
      </div>
    </header>
  );
}
