import { LoaderCircle } from "lucide-react";
import { cn } from "../../lib/cn";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
  children: React.ReactNode;
  classNameContainer?: string;
  loading?: boolean;
}

export default function Button({
  asChild,
  className,
  children,
  loading,
  classNameContainer,
  ...props
}: ButtonProps) {
  const classes = cn("btn btn-primary", className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {loading && (
        <span className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 animate-spin">
          <LoaderCircle className="size-7" />
        </span>
      )}
      <span
        className={cn(
          "opacity-100 transition-opacity",
          classNameContainer,
          loading && "opacity-0"
        )}
      >
        {children}
      </span>
    </button>
  );
}
