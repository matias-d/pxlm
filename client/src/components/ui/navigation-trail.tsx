import { Link } from "react-router";
import { cn } from "../../lib/cn";
import React from "react";

interface Props {
  items: { label: string; href?: string }[];
  className?: string;
}

export default function NavigationTrail({ items, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 text-sm font-display mb-10",
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-text-secondary">/</span>}

          {item.href ? (
            <Link
              to={item.href}
              className="text-text-secondary hover:text-text-primary transition-all hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <p className="text-accent">{item.label}</p>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
