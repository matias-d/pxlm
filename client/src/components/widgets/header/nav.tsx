import { NavLink } from "react-router";

const links = [
  {
    id: 1,
    to: "/marketplace",
    label: "Home",
  },
  {
    id: 2,
    to: "/marketplace/collection",
    label: "Collection",
  },
  {
    id: 3,
    to: "/marketplace/create",
    label: "Create",
  },
];

export default function Nav() {
  return (
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
  );
}
