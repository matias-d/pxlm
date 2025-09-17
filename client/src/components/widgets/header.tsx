import { NavLink } from "react-router";
import AvatarUI from "../ui/avatar-ui";
import { Dot } from "lucide-react";
import Logo from "../ui/logo";

const links = [
  {
    id: 1,
    to: "/marketplace",
    label: "Home",
  },
  {
    id: 1,
    to: "/marketplace/collection",
    label: "Collection",
  },
  {
    id: 1,
    to: "/marketplace/create",
    label: "Create",
  },
];

export default function Header() {
  return (
    <header className="rounded-md p-5 flex items-center justify-between bg-card shadow">
      <Logo />
      <nav className="flex gap-x-12">
        {links.map((link) => (
          <NavLink
            to={link.to}
            key={link.id}
            end={link.to === "/marketplace"}
            className={({ isActive }) =>
              isActive
                ? "text-sm text-accent relative drop-shadow-[0_0_16px_rgba(255,255,255,1)] tansition-cube"
                : "text-sm text-text-secondary relative hover:drop-shadow-[0_0_16px_rgba(255,255,255,1)] tansition-cube"
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="size-1 rounded-full bg-accent absolute -bottom-3 left-1/2 -translate-x-1/2"></div>
                )}

                {link.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
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

        <AvatarUI username="Matias" />
      </div>
    </header>
  );
}
